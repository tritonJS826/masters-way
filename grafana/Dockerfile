FROM grafana/grafana:6.7.4

COPY ./provisioning/dashboards /etc/grafana/provisioning/dashboards
COPY ./provisioning/datasources /etc/grafana/provisioning/datasources
COPY ./dashboards /var/lib/grafana/dashboards

# Ensure the correct permissions
# RUN chown -R grafana:grafana /etc/grafana/provisioning /var/lib/grafana/dashboards
