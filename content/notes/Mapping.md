---
title: "Functions and Mappings"
type: "reference"
category: "course-content"
publishedAt: "2025-01-11"
summary: "Understanding functions as mappings between sets, including key properties and types."
tags: ["functions", "mappings", "foundations"]
displayInNotes: true
order: 11
relatedContent: ["Sets", "injective", "surjective"]
subcategory: "foundations"
isPublished: true
weight: 11
---

Given [[Sets|sets]] $\mathbb{X}, \mathbb{Y}$, a function or mapping from $\mathbb{X}$ to $\mathbb{Y}$ is a rule that assigns each $x \in \mathbb{X}$ a unique element $f(x) \in \mathbb{Y}$ 

Formally: 

$$
f: \mathbb{X} \longrightarrow \mathbb{Y}
$$

Where $\mathbb{X}$ is the domain of the function and $\mathbb{Y}$ is the codomain or image of $f$

<img 
  src="/assets/images/BasicMappings.png" 
  alt="Function Mapping showing domain and codomain" 
  width={600} 
  height={400} 
/>

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
