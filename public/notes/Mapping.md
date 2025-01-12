---
title: Functions and Mappings
publishedAt: '2025-01-11'
summary: 'Exploring functions as mappings between sets, including key properties and classifications.'
---

Given [[Sets|sets]] $\mathbb{X}, \mathbb{Y}$, a function or mapping from $\mathbb{X}$ to $\mathbb{Y}$ is a rule that assigns each $x \in \mathbb{X}$ a unique element $f(x) \in \mathbb{Y}$ 

Formally: 

$$
f: \mathbb{X} \longrightarrow \mathbb{Y}
$$

Where $\mathbb{X}$ is the domain of the function and $\mathbb{Y}$ is the codomain or image of $f$

![Function Mapping](/assets/BasicMappings.png)

## Optional Properties
[[Injective]] - One-to-One: 

$$
\forall x_1, x_2 \in \mathbb{X}, \; f(x_1)=f(x_2) \implies x_1=x_2
$$

[[Surjective]] - Onto: 

$$
\forall y \in \mathbb{Y}, \; \exists x \in \mathbb{X} : f(x)=y
$$

Bijective - Both injective and surjective

## Example
A function $f: \mathbb{Z} \longrightarrow \mathbb{Z}$ is defined as $f(x)=x^2$ where $x \in \mathbb{Z}$
