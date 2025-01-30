---
title: Vector Space Axioms
type: note
category: vector-spaces
order: 2
tags:
  - vectors
  - axioms
  - fundamentals
publishedAt: '2025-01-11'
summary: "The fundamental axioms that define a vector space."
relatedContent: ["vector-space", "vectors", "vector-subspaces"]
isPublished: true
---

## Axioms
A [[vector-space|Vector Space]] is defined as a set $\mathbb{V}$, together with two operations:
1. Vector addition: $+: \mathbb{V} \times \mathbb{V} \to \mathbb{V}$
2. Scalar multiplication: $\cdot: \mathbb{F} \times \mathbb{V} \to \mathbb{V}$

where $\mathbb{F}$ is a field (typically $\mathbb{R}$ or $\mathbb{C}$).

For arbitrary vectors $u,v,w \in \mathbb{V}$ and scalars $a,b \in \mathbb{F}$, the following axioms must hold:

### Vector Addition Axioms

1) **Associativity**
   $$(u + v) + w = u + (v + w)$$

2) **Additive Identity**
   - There exists a zero vector $\mathbf{0} \in \mathbb{V}$ such that:
   $$v + \mathbf{0} = \mathbf{0} + v = v \text{ for all } v \in \mathbb{V}$$

3) **Additive Inverse**
   - For each $v \in \mathbb{V}$, there exists an element $-v \in \mathbb{V}$ such that:
   $$v + (-v) = (-v) + v = \mathbf{0}$$

4) **Commutativity**
   $$u + v = v + u$$

### Scalar Multiplication Axioms

5) **Scalar Multiplication Identity**
   $$1v = v \text{ for all } v \in \mathbb{V}$$

6) **Scalar Multiplication Associativity**
   $$a(bv) = (ab)v$$

7) **Distribution over Vector Addition**
   $$a(u + v) = au + av$$

8) **Distribution over Scalar Addition**
   $$(a + b)v = av + bv$$
