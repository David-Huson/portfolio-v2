---
title: Image Classifier
publishDate: 2022-04-21 18:48:00
img: /assets/horseorhuman_thumbnail.webp
img_alt: Horse on the left and human on the right with a bright green and blue background. Text in the front that asks, horse or human?
description: |
  A project developed as a student-chosen topic for an Introduction to AI course. Special thanks to my project parther Joel Ward
tags:
  - Artificial Intelligence
  - Python
  - Computer Vision
  - Machine Learning
archived: true
---

## The problem

For an Introduction to AI course, my partner Joel Ward and I picked binary image classification as our topic and trained a CNN on the Horse-or-Human dataset, a well-known teaching set. The task is to label an image as horse or human.

## The decision

The obvious route was transfer learning from ResNet50, VGG16, InceptionV3, or EfficientNet. We deliberately went the other way and built a small CNN from scratch in TensorFlow/Keras, then used Keras Tuner to search the hyperparameters one at a time: number of convolution layers, filter counts, kernel size and stride, and the width of the dense layer before the output. We wanted to see what the search would find rather than inherit someone else's architecture.

## The tradeoff

That choice cost us generalization. Horse-or-Human has 1027 training images (500 horses, 527 humans), far too few to learn general visual features from random initialization. A pretrained backbone would have brought features learned from a much larger dataset and almost certainly done better on unseen images. What we got instead was a clear read on which hyperparameters actually moved the number.

## Outcome

We started around 74% validation accuracy on a basic two-convolution setup and reached 89.8% after tuning, with a best model at 91.8%. Those numbers do not survive contact with images pulled off the internet. The dataset is biased toward full-body humans, so a photo showing only part of a person gets misclassified. The validation score measures fit to a small, narrow dataset, not the ability to tell horses from humans.

For more details, our <a href='/assets/files/Project_2_Report-compressed.pdf'>full report</a>.
