<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![APACHE License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gjimenezUCM/simviz">
    <img src="images/logo.svg" alt="SimViz Logo" height="80">
  </a>

<h3 align="center">SimViz</h3>

  <p align="center">
    An interactive visualization tool designed to facilitate the comprehension of (potentially complex) similarity measures
    <br />
    <a href="https://gjimenezucm.github.io/simviz/docs/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gjimenezucm.github.io/simviz/">View Demo</a>
    ·
    <a href="https://github.com/gjimenezUCM/simviz/issues">Report Bug</a>
    ·
    <a href="https://github.com/gjimenezUCM/simviz/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![SimViz ScreenShot](/images/mainUI.png)](https://github.com/gjimenezUCM/simviz)

SimViz (**Sim**ilarity **Vi**suali**Z**ation) is a tool focused on the interactive visualization of similarity functions and how they are computed over different case bases.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com/javascript/)
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- [![JQuery][JQuery.com]][JQuery-url]
- [Tabulator](https://tabulator.info/)
- [vis.js](https://visjs.org/)
- [Webpack](https://webpack.js.org/)
- [Handlebars](https://handlebarsjs.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Install the prerrequisites with npm:

```sh
npm install
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/gjimenezUCM/simviz.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. The application is built using Webpack. To do it:
   ```sh
   npm run build
   ```
4. During development, run a development server with:
   ```sh
   npm run start
   ```
5. Generate SimViz documentation with:
  ```sh
  npm run docs
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

SimViz interface displays a menu bar to select the case base and the similarity measure to analyze. Then, it is organized in four panels:

- _Case comparison panel_, to compare similarity values between cases.
- _Similarity value distribution panel_, to explore the similarity scores.
- _Information panel_, to display information about the loaded case base and the selected similarity measure.
- _Taxonomy viewer panel_, to display taxonomy values if a case attribute supports this data type.

### Datasets/Case bases

Right now, with SimViz we can explore four different case bases:

- [Blood Alcohol Domain](https://github.com/gateslm/Blood-Alcohol-Domain)
- [Breast Cancer Wisconsin](https://doi.org/10.1016/j.artmed.2019.01.001)
- [Travel Agent](https://ai-cbr.cs.auckland.ac.nz/cases.html)
- [Used Cars](https://zenodo.org/records/15006920). This case base is provided in two flavors: one with a simple attribute-value structure and a taxonomic attribute, and another to exemplify the use of SimViz in cases with object-oriented attributes
- DMH Dataset: It contains 64 artwork descriptions from the Design Museum Helsinki, which imposed the definition of new similarity functions [for color perception and emotions](https://doi.org/10.1007/978-3-030-86957-1_4).

Watch the tutorial videos in [Help section](https://gjimenezucm.github.io/simviz/help.html) for more details about SimViz features.

### Similarity data

Similarity data is computed offline using a weighted average as global similarity function, and predefined local similarity functions over the attributes of the cases contained in a case base. The case base and the similarity data are enriched with information about attribute datatypes, local similarity functions, weights for global similarity functions and user explanations.

The [`data`](/data/) folder in this repository contains a folder for each case base and scripts in Python about how the examples were created. Similarity data is generated using [CBRkit](https://github.com/wi2trier/cbrkit), a Python framework for building Case-based Reasoning applications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Known Issues

- Casebase id attribute must be a string and it must start with a character.
- Sometimes the colors in the histogram are different from the colors in the heatmap and the color legend. This is an issue with Plotly and how it generates histograms when there is no data for leading or trailing bars.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the APACHE 2.0 License. See `LICENSE-2.0.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[@guille_fdi](https://twitter.com/guille_fdi) - [gjimenez@ucm.es](mailto:gjimenez@ucm.es)

[https://github.com/gjimenezUCM/simviz](https://github.com/gjimenezUCM/simviz)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/gjimenezUCM/simviz.svg?style=for-the-badge
[contributors-url]: https://github.com/gjimenezUCM/simviz/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gjimenezUCM/simviz.svg?style=for-the-badge
[forks-url]: https://github.com/gjimenezUCM/simviz/network/members
[stars-shield]: https://img.shields.io/github/stars/gjimenezUCM/simviz.svg?style=for-the-badge
[stars-url]: https://github.com/gjimenezUCM/simviz/stargazers
[issues-shield]: https://img.shields.io/github/issues/gjimenezUCM/simviz.svg?style=for-the-badge
[issues-url]: https://github.com/gjimenezUCM/simviz/issues
[license-shield]: https://img.shields.io/badge/License-Apache_2.0-blue.svg
[license-url]: https://github.com/gjimenezUCM/simviz/blob/master/LICENSE-2.0.txt
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
