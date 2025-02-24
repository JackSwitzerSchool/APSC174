---
title: Null Space and Kernel
type: note
category: linear-transformations
order: 2
tags:
  - linear-transformations
  - null-space
  - kernel
  - rank-nullity
  - matrices
publishedAt: '2025-02-24'
summary: "Understanding null spaces (kernels) of linear transformations and the rank-nullity theorem."
relatedContent: ["linear-transformations", "vector-space", "matrix", "vector-space-dimension"]
subcategory: "transformations"
isPublished: true
weight: 18
---

## Definition
The **null space** (or **kernel**) of a [[linear-transformations|linear transformation]] $T: V \rightarrow W$ is the set of all [[vectors|vectors]] in $V$ that map to the zero [[vectors|vector]] in $W$:

$$\text{Null}(T) = \ker(T) = \{v \in V : T(v) = \vec{0}_W\}$$

where $\vec{0}_W$ is the zero vector in $W$.

## Properties

1. **Subspace**: The null space of a [[linear-transformations|linear transformation]] $T: V \rightarrow W$ is a [[vector-subspaces|subspace]] of $V$.

2. **Dimension**: The [[vector-space-dimension|dimension]] of the null space is called the **nullity** of $T$:
   $$\text{nullity}(T) = \dim(\ker(T))$$

3. **Injectivity**: A [[linear-transformations|linear transformation]] $T$ is [[injective|injective]] (one-to-one) if and only if $\ker(T) = \{\vec{0}_V\}$, i.e., the null space contains only the zero [[vectors|vector]].

## Null Space of a Matrix

For a [[matrix|matrix]] $A \in \mathbb{R}^{m \times n}$, the null space of $A$ is the set of all [[vectors|vectors]] $\vec{x} \in \mathbb{R}^n$ such that $A\vec{x} = \vec{0}$:

$$\text{Null}(A) = \{\vec{x} \in \mathbb{R}^n : A\vec{x} = \vec{0}\}$$

This corresponds to the null space of the [[linear-transformations|linear transformation]] $T_A: \mathbb{R}^n \rightarrow \mathbb{R}^m$ defined by $T_A(\vec{x}) = A\vec{x}$.

### Finding the Null Space of a Matrix

To find a [[basis|basis]] for the null space of a [[matrix|matrix]] $A$:

1. Transform $A$ into [[rref|row-reduced echelon form (RREF)]] using [[gaussian-elim|Gaussian elimination]].
2. Identify the free variables (variables that are not leading variables in the RREF).
3. Express the leading variables in terms of the free variables.
4. Write the general solution as a [[linear-combinations|linear combination]] of [[vectors|vectors]], each corresponding to setting one free variable to 1 and the others to 0.
5. These [[vectors|vectors]] form a [[basis|basis]] for the null space.

## Example

Consider the [[matrix|matrix]]:
$$A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}$$

The [[rref|RREF]] of $A$ is:
$$\begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{bmatrix}$$

The equation $A\vec{x} = \vec{0}$ becomes:
$$\begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

This gives us:
$$x_1 + 2x_2 + 3x_3 = 0$$

Solving for $x_1$:
$$x_1 = -2x_2 - 3x_3$$

The general solution is:
$$\vec{x} = \begin{bmatrix} -2x_2 - 3x_3 \\ x_2 \\ x_3 \end{bmatrix} = x_2 \begin{bmatrix} -2 \\ 1 \\ 0 \end{bmatrix} + x_3 \begin{bmatrix} -3 \\ 0 \\ 1 \end{bmatrix}$$

Therefore, a [[basis|basis]] for the null space of $A$ is:
$$\left\{ \begin{bmatrix} -2 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} -3 \\ 0 \\ 1 \end{bmatrix} \right\}$$

And the nullity of $A$ is 2.

## Rank-Nullity Theorem

The **Rank-Nullity Theorem** is a fundamental result in [[linear-transformations|linear algebra]] that relates the [[vector-space-dimension|dimension]] of a [[vector-space|vector space]] to the rank and nullity of a [[linear-transformations|linear transformation]].

> **Theorem**: If $T: V \rightarrow W$ is a [[linear-transformations|linear transformation]] and $V$ is finite-dimensional, then:
> 
> $$\dim(V) = \text{rank}(T) + \text{nullity}(T)$$
> 
> where $\text{rank}(T) = \dim(\text{Im}(T))$ and $\text{nullity}(T) = \dim(\ker(T))$.

### Interpretation

The Rank-Nullity Theorem tells us that the [[vector-space-dimension|dimension]] of the domain equals the sum of:
- The [[vector-space-dimension|dimension]] of the image (how much of the domain is "preserved" by the transformation)
- The [[vector-space-dimension|dimension]] of the kernel (how much of the domain is "collapsed" to zero)

### Matrix Form

For a [[matrix|matrix]] $A \in \mathbb{R}^{m \times n}$:
$$n = \text{rank}(A) + \dim(\text{Null}(A))$$

## Applications

1. **Systems of Linear Equations**: The null space of a coefficient [[matrix|matrix]] represents the solution space of the homogeneous [[systems-of-linear-equations|system]].

2. **Linear Independence**: [[vectors|Vectors]] $\{v_1, v_2, \ldots, v_k\}$ are [[linear-dependence|linearly independent]] if and only if the null space of the [[matrix|matrix]] with these [[vectors|vectors]] as columns contains only the zero [[vectors|vector]].

3. **Eigenvalues and Eigenvectors**: For a square [[matrix|matrix]] $A$, the eigenvectors corresponding to eigenvalue $\lambda$ form the null space of $(A - \lambda I)$.

4. **Differential Equations**: The null space of a differential operator corresponds to the solution space of the homogeneous differential equation.

## Exercise
Find a [[basis|basis]] for the null space of the [[matrix|matrix]]:
$$B = \begin{bmatrix} 1 & 2 & 1 & 1 \\ 2 & 4 & 0 & 0 \\ 3 & 6 & 1 & 1 \end{bmatrix}$$

Verify the Rank-Nullity Theorem for this [[matrix|matrix]]. 