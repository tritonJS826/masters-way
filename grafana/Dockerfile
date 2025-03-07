FROM grafana/grafana:6.7.4

COPY grafana/provisioning/dashboards /etc/grafana/provisioning/dashboards
COPY grafana/provisioning/datasources /etc/grafana/provisioning/datasources
COPY grafana/dashboards /var/lib/grafana/dashboards
COPY grafana/grafana.ini /etc/grafana/grafana.ini

USER root
RUN chown -R grafana:grafana /etc/grafana/provisioning /var/lib/grafana/dashboards
