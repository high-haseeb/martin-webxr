# AR Three.js Project Documentation

## Introduction

Welcome to the Augmented Reality (AR) Three.js Project documentation! This project leverages Three.js, TWEEN, and various UI components to create an immersive AR experience. The documentation provides an overview of the project, installation instructions, usage guidelines, project structure details, information on dependencies, and more.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Dependencies](#dependencies)
5. [Documentation](#documentation)

## Installation <a name="installation"></a>

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ar-threejs-project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ar-threejs-project
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

This will launch the project on a local server, and you can access it in your web browser at <http://localhost:3000>.

## Usage

1. **Open the project in a web browser after starting the development server.**

2. **Interact with the AR scene using the provided UI icons for actions such as:**

   - Zooming
   - Rotating
   - Changing views
   - and more...

3. **Explore the immersive AR experience with:**
   - 3D model rendering
   - Smooth animations

## Project Structure <a name="project-structure"></a>

- **src/**

  - **UI/**
    - `style.css`: Stylesheet for UI elements.
    - `BottomBar.js`: Class for the bottom UI bar.
    - `ToolTip.js`: Class for tooltips.
    - `BackgroundChanger.js`: Class for changing the background.
    - `Languages.js`: Class for language selection.
  - `Animator.js`: Class for managing animations.
  - `IconManager.js`: Class for managing UI icons.
  - `Lighting.js`: Class for lighting setup in the AR scene.
  - `ModelLoader.js`: Class for loading 3D models.

- **helpers/**
  - `ARButton.js`: Helper for AR functionality.
  - `VRButton.js`: Helper for VR functionality.

## Dependencies <a name="dependencies"></a>

- **Three.js**: A JavaScript library for 3D graphics.
- **TWEEN.js**: A library for creating smooth animations.
- **@tweenjs/tween.js**: A tweening engine for JavaScript.
- **Webpack**: A module bundler for JavaScript applications.
- **Babel**: A JavaScript compiler for ECMAScript 2015+.

## Documentation <a name="documentation"></a>

- Detailed documentation for each class (`Animator`, `IconManager`, etc.) can be found in the respective source files. Refer to the inline comments and class methods.
