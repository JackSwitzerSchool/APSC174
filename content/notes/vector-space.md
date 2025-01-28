---
title: "Vector Spaces"
type: "reference"
category: "course-content"
publishedAt: "2025-01-16"
summary: "Fundamental definition and properties of vector spaces, including operations and their generalizations."
tags: ["vector-spaces", "linear-algebra", "foundations"]
displayInNotes: true
order: 20
relatedContent: ["vectors", "vector-space-axioms", "vector-subspaces"]
subcategory: "foundations"
isPublished: true
weight: 20
---

## Definition
A Vector Space is a [[sets|set]] $\mathbb{V}$ with two operations, "+" and "·"

### "+"
The addition map takes 2 [[vectors]] and maps to another vector. 

Formally: $+:\mathbb{V} \times \mathbb{V} \rightarrow \mathbb{V}$
          $(v,w) \rightarrow v + w$

This is a generalization of the familiar addition and vector addition that you've seen until this point. You can simply add a vector componentwise
and receive another vector. However, due to this generalization, you start to pick up other valid "additions" that still work under the [[vector-space-axioms|axioms of a vector space]]. 

### "·"
The scalar multiplication map takes a vector and a scalar and maps to another vector.

Formally: $\cdot:\mathbb{F} \times \mathbb{V} \rightarrow \mathbb{V}$
          $(a,w) \rightarrow a \cdot w$

Where $\mathbb{F}$ is some field often $\mathbb{R}$ or $\mathbb{C}$, and $\mathbb{V}$ is your Vector Space.
Similarly, this formalizes the notions of regular multiplication and scalar multiplication that are familiar to you. If you multiply a vector by a scalar, you can simply distribute this multiplication elementwise and end up with another vector.

## Properties of a Vector Space
This may be the first formal mathematical "object" you've seen before. These objects are defined by their structure or properties.

[[vector-space-axioms|The axioms that define a vector space are:]]
% embedded eventually idk how rn%

## Examples
3 dimensional real space or $\mathbb{R}^3$ is a real vector space, it obeys all above axioms.
