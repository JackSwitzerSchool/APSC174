---
title: "Set Intersection"
type: "reference"
category: "course-content"
publishedAt: "2025-01-11"
summary: "Understanding the intersection operation on sets and its properties."
tags: ["sets", "operations", "intersection"]
displayInNotes: true
order: 13
relatedContent: ["Sets", "Union", "Subset"]
subcategory: "operations"
isPublished: true
weight: 13
---

## Definition
The intersection of two [[Sets|sets]] $\mathbb{X}, \mathbb{Y}$ is the set of all elements that belong to $\mathbb{X}$ *and* $\mathbb{Y}$

Formally: 

$$
\mathbb{X} \cap \mathbb{Y} = \{ x : x \in \mathbb{X} \text{ and } x \in \mathbb{Y} \}
$$

This notion of "and" is foundational to computer programming and logic gates.

## Properties
For arbitrary sets: $\mathbb{X}, \mathbb{Y}, \mathbb{Z}$, and the [[Empty Set|empty set]] $\emptyset$:

i) $\mathbb{X} \cap \mathbb{X} = \mathbb{X}$

ii) $\mathbb{X} \cap \mathbb{Y} = \mathbb{Y} \cap \mathbb{X}$

iii) $\mathbb{X} \cap (\mathbb{Y} \cap \mathbb{Z}) = (\mathbb{X} \cap \mathbb{Y}) \cap \mathbb{Z}$

iv) $\mathbb{X} \cap \emptyset = \emptyset$

## Example
Let $\mathbb{X}=\{a, b, c, d\}$, $\mathbb{Y}=\{a, e, f\}$

Then:

$$
\mathbb{X} \cap \mathbb{Y} = \{a\}
$$