# Kowl - A Web UI for Apache Kafka

----

**This fork is based on some commits right before the license changed from Apache 2.0 to the Redpanda Business Source License 1.1 / Redpanda Community License**

I probably won't add any features, I just want to preserve my beloved Kowl. 

----

Kowl (previously known as Kafka Owl) is a web application that helps you to explore messages in your Apache Kafka cluster and get better insights on what is actually happening in your Kafka cluster in the most comfortable way:

![preview](docs/assets/preview.gif)

## Features

- **Message viewer:** Explore your topics' messages in our message viewer through ad-hoc queries and dynamic filters. Find any message you want using JavaScript functions to filter messages. Supported encodings are: JSON, Avro, Protobuf, XML, MessagePack, Text and Binary (hex view). The used enconding (except Protobuf) is recognized automatically.
- **Consumer groups:** List all your active consumer groups along with their active group offsets, edit group offsets (by group, topic or partition) or delete a consumer group.
- **Topic overview:** Browse through the list of your Kafka topics, check their configuration, space usage, list all consumers who consume a single topic or watch partition details (such as low and high water marks, message count, ...), embed topic documentation from a git repository and more.
- **Cluster overview:** List ACLs, available brokers, their space usage, rack id and other information to get a high level overview of your brokers in your cluster.
- **Schema Registry:** List all Avro, Protobuf or JSON schemas within your schema registry.
- **Kafka connect:** Manage connectors from multiple connect clusters, patch configs, view their current state or restart tasks.

## Getting Started

### Prerequisites

- Kafka Cluster (v1.0.0+) connectivity
- At least one OAuth app for SSO (Kowl business only)
- Internet connectivity to validate license (Kowl business only)

### Installing

We offer pre built docker images for Kowl (Business), a Helm chart and a Terraform module to make the installation as comfortable as possible for you. Please take a look at our dedicated [Installation documentation](https://cloudhut.dev/docs/installation).

### Quick Start

Do you just want to test Kowl against one of your Kafka clusters without spending too much time on the test setup? Here are some docker commands that allow you to run it locally against an existing Kafka cluster:

#### Kafka is running locally

Since Kowl runs in its own container (which has its own network scope), we have to use host.docker.internal as a bootstrap server. That DNS resolves to the host system's ip address. However since the brokers send a list of all brokers' DNS when a client has connected, you have to make sure your advertised listener is connected accordingly, e.g.: `PLAINTEXT://host.docker.internal:9092`

```shell
docker run -p 8080:8080 -e KAFKA_BROKERS=host.docker.internal:9092 quay.io/cloudhut/kowl:master
```

Docker supports the `--network=host` option only on Linux. So Linux users use `localhost:9092` as advertised listener and use the host network namespace instead. Kowl will then be ran as it would be executed on the host machine.

```shell
docker run --network=host -p 8080:8080 -e KAFKA_BROKERS=localhost:9092 quay.io/cloudhut/kowl:master
```

#### Kafka is running remotely

Protected via SASL_SSL and trusted certificates (e.g. Confluent Cloud):

```shell
docker run -p 8080:8080 -e KAFKA_BROKERS=pkc-4r000.europe-west1.gcp.confluent.cloud:9092 -e KAFKA_TLS_ENABLED=true -e KAFKA_SASL_ENABLED=true -e KAFKA_SASL_USERNAME=xxx -e KAFKA_SASL_PASSWORD=xxx quay.io/cloudhut/kowl:master
```

#### I don't have a running Kafka cluster to test against

We maintain a docker-compose file that launches zookeeper, kafka and kowl: [/docs/local](./docs/local).

## Sponsors

<a href="https://www.rewe-digital.com/" target="_blank"><img src="./docs/assets/sponsors/rewe-digital-logo.png" width="150" /></a>

## Companies that use Kowl

- REWE Digital [https://www.rewe-digital.com/]
- Redpanda Data [https://redpanda.com/]
- OPT-NC (Office des Postes et Télécommunications de Nouvelle-Calédonie) [https://office.opt.nc/]

## License

Kowl is distributed under the [Apache 2.0 License](https://github.com/cloudhut/kowl/blob/master/LICENSE).
