package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// Path to the migrate binary in your project
	migrateBinary := "/home/triton/go/pkg/mod/github.com/golang-migrate/migrate@v3.5.4+incompatible" // Update this with the actual path in your project

	// Command to create a migration
	cmd := exec.Command(migrateBinary, "create", "-ext", "sql", "-dir", "db/migration", "-seq", "init_schema")

	// Set working directory for the command
	cmd.Dir = "./" // Update this with the actual working directory of your project

	// Set environment variables if needed
	// cmd.Env = append(os.Environ(), "ENV_VAR=value")

	// Set output to os.Stdout and os.Stderr
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Run the command
	err := cmd.Run()
	if err != nil {
		fmt.Println("Error creating migration:", err)
		return
	}

	fmt.Println("Migration created successfully.")
}
