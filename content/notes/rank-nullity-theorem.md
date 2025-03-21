---
title: "Rank-Nullity Theorem"
type: note
category: linear-transformations
order: 5
tags:
  - linear-transformations
  - rank
  - nullity
publishedAt: '2025-02-27'
summary: "Fundamental relationship between dimensions of domain, image, and kernel."
relatedContent: ["linear-transformations", "null-space", "image-of-vector-space"]
subcategory: "transformations"
isPublished: true
weight: 21
---

## The Theorem

For a linear transformation $L: V \rightarrow W$ between finite-dimensional vector spaces:

$$\dim(V) = \dim(\text{Im}(L)) + \dim(\text{Ker}(L))$$

## Key Implications

1. **Injectivity**: $L$ is injective if and only if $\dim(\text{Ker}(L)) = 0$

2. **Surjectivity**: $L$ is surjective if and only if $\dim(\text{Im}(L)) = \dim(W)$

3. **Dimension Constraint**: If $\dim(V) < \dim(W)$, then $L$ cannot be surjective

4. **Dimension Constraint**: If $\dim(V) > \dim(W)$, then $L$ cannot be injective

## Example

For $L: \mathbb{R}^4 \rightarrow \mathbb{R}^3$ with $\dim(\text{Ker}(L)) = 1$:

- $\dim(\text{Im}(L)) = \dim(V) - \dim(\text{Ker}(L)) = 4 - 1 = 3$
- Since $\dim(\text{Im}(L)) = \dim(W) = 3$, $L$ is surjective
- Since $\dim(\text{Ker}(L)) \neq 0$, $L$ is not injective 