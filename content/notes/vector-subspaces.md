---
title: Vector Subspaces
type: note
category: vector-spaces
order: 7
tags:
  - vectors
  - subspaces
  - linear-algebra
publishedAt: '2025-01-11'
summary: "Understanding vector subspaces and their properties."
relatedContent: ["vector-space", "vector-spans", "linear-combinations"]
isPublished: true
---

## Definition
A subspace of a [[vector-space|Vector Space]] $\mathbb{V}$ is a [[subset|Subset]] $\mathbb{W} \subseteq \mathbb{V}$ that is itself a vector space under the same operations.

For $\mathbb{W}$ to be a subspace, it must satisfy three properties:
1. **Closed under addition**: If $v,w \in \mathbb{W}$, then $v + w \in \mathbb{W}$
2. **Closed under scalar multiplication**: If $v \in \mathbb{W}$ and $c \in \mathbb{F}$, then $cv \in \mathbb{W}$
3. **Contains zero vector**: $\mathbf{0} \in \mathbb{W}$

Note: Properties 1 and 2 together mean closed under [[linear-combinations|Linear Combinations]]!

## Examples
### In $\mathbb{R}^3$
1. Any line through the origin
2. Any plane through the origin
3. $\{\mathbf{0}\}$ (the zero subspace)
4. All of $\mathbb{R}^3$

### Counter-Examples
1. A line not through the origin (fails property 3)
2. The unit circle (fails properties 1 and 2)
3. $\mathbb{R}^3$ without the origin (fails property 3)

## Common Ways to Get Subspaces
1. [[vector-spans|Spans]] of vectors
2. Solution space to homogeneous systems
3. [[intersection|Intersection]] of subspaces
4. Kernel (null space) of a [[mapping|Linear Transformation]]

## Why Do We Care?
Subspaces help us:
1. Break down complicated spaces into simpler pieces
2. Understand solution spaces to systems of equations
3. Study linear transformations through their kernels and images
4. Develop the notion of [[vector-space|Dimension]]

Think of subspaces as "mini vector spaces" living inside bigger ones - they inherit all the nice properties of vector spaces but might be easier to work with!

## Exercise
Prove that the [[intersection|Intersection]] of any collection of subspaces is itself a subspace.
(Hint: Check the three properties directly)

