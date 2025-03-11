FROM grafana/grafana:6.7.4

# Create directories
RUN mkdir -p /etc/grafana/provisioning/dashboards \
    && mkdir -p /etc/grafana/provisioning/datasources \
    && mkdir -p /var/lib/grafana/dashboards/general \
    && mkdir -p /var/lib/grafana/dashboards/databases

# Copy configuration files
COPY grafana/provisioning/dashboards/ /etc/grafana/provisioning/dashboards/
COPY grafana/provisioning/datasources/ /etc/grafana/provisioning/datasources/
COPY grafana/dashboards/general/ /var/lib/grafana/dashboards/general/
COPY grafana/dashboards/databases/ /var/lib/grafana/dashboards/databases/
COPY grafana/grafana.ini /etc/grafana/grafana.ini

# Set permissions
USER root
RUN chown -R 472:472 /etc/grafana/provisioning/ /var/lib/grafana/dashboards/ && \
    chmod -R 755 /etc/grafana/provisioning/ /var/lib/grafana/dashboards/

USER 472
