---
title: "Week 7: Dimensions and Linear Transformations"
type: "note"
category: "weekly-summary"
publishedAt: "2025-02-24"
summary: "Dimensions of vector spaces, linear transformations, null spaces, and the rank-nullity theorem"
tags: 
displayInNotes: true
order: 7
relatedContent:
subcategory: "week-7"
isPublished: true
weight: 16
---
## Week 7 Summary

This week we explored three fundamental concepts in linear algebra that build upon our understanding of [[vector-space|vector spaces]]:

### 1. Dimensions of Vector Spaces

- The concept of [[vector-space-dimension|dimension]] as the size of a [[basis|basis]]
- The key lemma relating [[linear-dependence|linearly independent]] sets and [[gen-sets|spanning sets]]
- Finite-dimensional vs. infinite-dimensional [[vector-space|vector spaces]]

### 2. Linear Transformations

- Definition and properties of [[linear-transformations|linear transformations]]
- [[matrix|Matrix]] representations of [[linear-transformations|linear transformations]]
- Composition of [[linear-transformations|linear transformations]]

### 3. Null Spaces and Kernels

- Definition of [[null-space|null space]] (kernel) of a [[linear-transformations|linear transformation]]
- Relationship between [[null-space|null space]] and solutions to homogeneous [[systems-of-linear-equations|systems]]
- The rank-nullity theorem and its applications

### Key Lemma

One of the most important results we covered is:

> **Key Lemma**: Let V be a [[vector-space|vector space]], and suppose that {u₁, u₂, ..., uₐ} is a set of [[linear-dependence|linearly independent]] vectors in V, and that {v₁, v₂, ..., vᵦ} is a [[gen-sets|spanning set]] for V. Then a ≤ b.

This lemma establishes that:
- Any [[linear-dependence|linearly independent]] set can have at most as many [[vectors|vectors]] as any [[gen-sets|spanning set]]
- All [[basis|bases]] of a [[vector-space|vector space]] have the same number of elements
- The [[vector-space-dimension|dimension]] of a [[vector-space|vector space]] is well-defined
