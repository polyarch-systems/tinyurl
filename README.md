# TinyURL

This repository is my way of learning system design.

There are hundreds of articles explaining Redis, Kafka, Kubernetes, CQRS, event sourcing, and other technologies. They're useful, but after reading them I still had the same question:

> How do you know when you actually need them?

<br />

That's what this project is about.

Instead of starting with architecture, I'm starting with a product.

A URL shortener is simple enough to build from scratch, but complex enough to eventually require caching, queues, background jobs, replication, observability, and other architectural decisions.

The goal isn't to recreate Bitly.

The goal is to understand how architecture changes as a product grows.

Every feature in this repository should answer one question:

> Why is this necessary?

If I can't explain what problem a technology solves, it doesn't belong here.

I want the project to evolve the same way real software evolves: from a small application solving a real problem into a system whose architecture is driven by requirements rather than trends.

<img width="1619" height="972" alt="image" src="https://github.com/user-attachments/assets/18cb6787-deb3-4d12-9b88-1947895c248a" />
