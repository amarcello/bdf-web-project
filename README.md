# BDF Project

This is a Web Development project based on a Sketch design.
The live version is hosted with Firebase at https://bdf-project-329421.web.app/.

# Project Setup

## Development files

- All the `.scss` and `.js` files are under the `src` folder.
- All the `.pug` templates are under the `templates` folder.

## Productions files

All the final, compiled files are under the `public` folder.

# Getting Started

## 1. Setting up the environment

### IMPORTANT: If you're running a Node version higher than 12, please refer to the [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) documentation on how to install and use an earlier version before moving to the next step.

_Some of the pug npm packages haven't been updated in a while and they cause conflicts with higher versions of Node._

## 2. Installing dependencies

```Shell
$ npm install
```

## 3. Loading your development environment

```Shell
$ npm run start
```

It will:

- Launch the website on your local environment;
- Watch for `.scss` and `.js` changes under the `/[project_dir]/src` folder;
- Watch for `.pug` changes under the `/[project_dir]/templates`;

## 4. Compiling assets for production

```Shell
$ npm run build
```

## Deployment

Deploy the `/public` folder to your preferred hosting service.
