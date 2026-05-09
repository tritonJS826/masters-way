#!/bin/bash

# I added this script to download unity sol assets automatically


# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install packages
install_packages() {
    if command_exists apt-get; then
        apt-get update
        for pkg in "$@"; do
            if ! command_exists "$pkg"; then
                apt-get install -y "$pkg"
            fi
        done
    elif command_exists apk; then
        apk update
        for pkg in "$@"; do
            if ! command_exists "$pkg"; then
                apk add "$pkg"
            fi
        done
    elif command_exists brew; then
        brew update
        for pkg in "$@"; do
            if ! command_exists "$pkg"; then
                brew install "$pkg"
            fi
        done
    elif command_exists pacman; then
        pacman_sync_needed=false
        for pkg in "$@"; do
            if ! command_exists "$pkg"; then
                pacman_sync_needed=true
                break
            fi
        done
        if [ "$pacman_sync_needed" = true ]; then
            pacman -Sy --noconfirm
            for pkg in "$@"; do
                if ! command_exists "$pkg"; then
                    pacman -S --noconfirm "$pkg"
                fi
            done
        fi
    else
        echo "Error: No supported package manager found. Please install packages manually."
        exit 1
    fi
}

# Install curl and unzip if not installed
install_packages wget unzip

SOL_WEB_ZIP_URL="https://drive.usercontent.google.com/download?id=1KpY-cGbxOIU3Fw4Kro7KPmFwvMBbYxBm&confirm=t"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINATION_DIR="$SCRIPT_DIR/../public/sol"
CACHE_FILE="$SCRIPT_DIR/../public/sol/sol.zip"

mkdir -p "$DESTINATION_DIR"

if [ ! -f "$CACHE_FILE" ]; then
    wget --no-check-certificate $SOL_WEB_ZIP_URL -O $CACHE_FILE
    unzip -o "$CACHE_FILE" -d "$DESTINATION_DIR"
    echo "Sol artifacts downloaded and extracted to $DESTINATION_DIR"
else
    echo "Sol artifacts already exist in $DESTINATION_DIR, skipping download."
fi

