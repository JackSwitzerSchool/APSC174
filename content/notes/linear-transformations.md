---
title: Linear Transformations
type: note
category: linear-transformations
order: 1
tags:
  - linear-transformations
  - functions
  - matrices
  - vector-spaces
publishedAt: '2025-02-24'
summary: "Understanding linear transformations between vector spaces and their fundamental properties."
relatedContent: ["vector-space", "matrix", "null-space", "basis"]
subcategory: "transformations"
isPublished: true
weight: 17
---

## Definition
A **linear transformation** $T: V \rightarrow W$ between [[vector-space|vector spaces]] $V$ and $W$ is a function that preserves [[vector-space-axioms|vector addition and scalar multiplication]]:

1. $T(u + v) = T(u) + T(v)$ for all $u, v \in V$ (preserves addition)
2. $T(c \cdot v) = c \cdot T(v)$ for all $v \in V$ and scalars $c$ (preserves scalar multiplication)


## Examples

### Rotation in $\mathbb{R}^2$
A rotation by angle $\theta$ in the plane is a [[linear-transformations|linear transformation]]:
$$T\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}$$

### Differentiation
The differentiation operator $D: P_n \rightarrow P_{n-1}$ defined by $D(p(x)) = p'(x)$ is a [[linear-transformations|linear transformation]] on the space of polynomials.

### Projection
The projection of a [[vectors|vector]] onto a [[vector-subspaces|subspace]] is a [[linear-transformations|linear transformation]].

## Matrix Representation

Every [[linear-transformations|linear transformation]] $T: V \rightarrow W$ between finite-dimensional [[vector-space|vector spaces]] can be represented by a [[matrix|matrix]] with respect to chosen [[basis|bases]].

If $\{v_1, v_2, \ldots, v_n\}$ is a [[basis|basis]] for $V$ and $\{w_1, w_2, \ldots, w_m\}$ is a [[basis|basis]] for $W$, then:

1. Compute $T(v_j)$ for each [[basis|basis]] [[vectors|vector]] $v_j$
2. Express each $T(v_j)$ as a [[linear-combinations|linear combination]] of the [[basis|basis]] [[vectors|vectors]] of $W$:
   $$T(v_j) = a_{1j}w_1 + a_{2j}w_2 + \cdots + a_{mj}w_m$$
3. The [[matrix|matrix]] representation of $T$ is the $m \times n$ [[matrix|matrix]]:
   $$[T] = \begin{bmatrix} 
   a_{11} & a_{12} & \cdots & a_{1n} \\
   a_{21} & a_{22} & \cdots & a_{2n} \\
   \vdots & \vdots & \ddots & \vdots \\
   a_{m1} & a_{m2} & \cdots & a_{mn}
   \end{bmatrix}$$

## Properties

### Kernel and Image
- The **kernel** (or **[[null-space|null space]]**) of $T$, denoted $\ker(T)$ or $\text{Null}(T)$, is the set of all [[vectors|vectors]] in $V$ that map to the zero [[vectors|vector]] in $W$:
  $$\ker(T) = \{v \in V : T(v) = 0\}$$

- The **image** (or **range**) of $T$, denoted $\text{Im}(T)$ or $\text{Range}(T)$, is the set of all [[vectors|vectors]] in $W$ that are the image of some [[vectors|vector]] in $V$:
  $$\text{Im}(T) = \{T(v) : v \in V\}$$

### Rank and Nullity
- The **rank** of $T$ is the [[vector-space-dimension|dimension]] of its image: $\text{rank}(T) = \dim(\text{Im}(T))$
- The **nullity** of $T$ is the [[vector-space-dimension|dimension]] of its kernel: $\text{nullity}(T) = \dim(\ker(T))$

### Rank-Nullity Theorem
For a [[linear-transformations|linear transformation]] $T: V \rightarrow W$ where $V$ is finite-dimensional:
$$\dim(V) = \text{rank}(T) + \text{nullity}(T)$$

This fundamental theorem connects the [[vector-space-dimension|dimension]] of the domain, the [[vector-space-dimension|dimension]] of the image, and the [[vector-space-dimension|dimension]] of the [[null-space|kernel]].

## Composition of Linear Transformations

If $S: U \rightarrow V$ and $T: V \rightarrow W$ are [[linear-transformations|linear transformations]], then their composition $T \circ S: U \rightarrow W$ defined by $(T \circ S)(u) = T(S(u))$ is also a [[linear-transformations|linear transformation]].

In terms of [[matrix|matrix]] representations, if $[S]$ is the [[matrix|matrix]] of $S$ and $[T]$ is the [[matrix|matrix]] of $T$, then the [[matrix|matrix]] of $T \circ S$ is the product $[T][S]$.

## Invertible Linear Transformations

A [[linear-transformations|linear transformation]] $T: V \rightarrow W$ is **invertible** if there exists a [[linear-transformations|linear transformation]] $T^{-1}: W \rightarrow V$ such that $T^{-1} \circ T = I_V$ and $T \circ T^{-1} = I_W$, where $I_V$ and $I_W$ are the identity transformations on $V$ and $W$ respectively.

A [[linear-transformations|linear transformation]] is invertible if and only if:
1. It is [[injective|injective]] (one-to-one): $\ker(T) = \{0\}$
2. It is [[surjective|surjective]] (onto): $\text{Im}(T) = W$

For finite-dimensional spaces of the same [[vector-space-dimension|dimension]], these conditions are equivalent.

## Applications

[[linear-transformations|Linear transformations]] are fundamental in:
- Computer graphics (rotations, scaling, projections)
- Quantum mechanics (operators on state spaces)
- Signal processing (Fourier transforms)
- Machine learning (linear models, dimensionality reduction)
- Differential equations (solving systems of linear ODEs) 