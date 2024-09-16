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
  <!-- <a href="https://github.com/gjimenezUCM/simviz">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">SimViz</h3>

  <p align="center">
    A exploratory visualization tool aimed at understanding, identifying and
rectifying errors in both data and similarity measures
    <br />
    <a href="https://github.com/gjimenezUCM/simviz"><strong>Explore the docs »</strong></a>
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
    <!-- <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![SimViz ScreenShot](/images/mainUI.png)](https://github.com/gjimenezUCM/simviz)

SimViz (**Sim**ilarity **Vi**suali**Z**ation) is a tool focused on the interactive visualization of similarity functions and how they are computed over different case bases.

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com/javascript/)
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [Webpack](https://webpack.js.org/)
* [Handlebars](https://handlebarsjs.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Install the prerrequisites with:

* npm
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

The main interface of SimViz is organized in three columns or panels:
– _Similarity selection and description panel_ (left): Users employ this panel to select a case base to visualize and to choose a similarity function over this case base.
– _Similarity value distribution panel (middle)_: a heatmap and a histogram shows information about the distribution of the similarity values over the case base. Both are interactive and will help to explore the cases and similarity values.
– _Case comparator panel (right)_: a table that displays side by side two cases selected using the similarity value distribution panel. The global similarity value is shown on the header while the local similarity values and the attributes involved in the similarity calculation are displayed in rows, with a bar displaying the attribute weight on the first cell of each row.

### Datasets/Case bases

Right now, with SimViz we can explore four different datasets:

- [Blood Alcohol Domain](https://github.com/gateslm/Blood-Alcohol-Domain)
- [Breast Cancer Wisconsin](https://doi.org/10.1016/j.artmed.2019.01.001)
- [Travel Agent](https://ai-cbr.cs.auckland.ac.nz/cases.html)
- DMH Dataset

The first ones use some basic local similarity metrics for numbers and nominal attribute values. The DMH dataset contains 64 artwork descriptions from the Design Museum Helsinki, which imposed the definition of new similarity functions [for color perception and emotions](https://doi.org/10.1007/978-3-030-86957-1_4).

### Similarity data

Similarity data is computed offline using a weighted average as global similarity function, and predefined local similarity functions over the attributes of the cases contained in a case base. The case base and the similarity data are enriched with information about attribute datatypes, local similarity functions, weights for global similarity functions and user explanations.

The [`data`](/data/) folder in this repository repository contains a notebook with some examples about how the current data was created to be visualized in the tool

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Known Issues

- Casebase id attribute must be a string.
- Stripe chart is not displayed properly if casebase id values start with numbers.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/gjimenezUCM/simviz/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- LICENSE -->
## License

Distributed under the APACHE 2.0 License. See `LICENSE-2.0.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@guille_fdi](https://twitter.com/guille_fdi) - gjimenez@ucm.es

Project Link: [https://github.com/gjimenezUCM/simviz](https://github.com/gjimenezUCM/simviz)

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
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
