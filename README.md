# Installation Instructions

## 1. First, please clone this source code

In this project, nodejs and expressjs is used as the main backend framework to perform construction and development. Backend is the backend so that the interface is completed simultaneously with the frontend of the dermaket. In this guide there will be some requirements to show you how to develop products using git to clone the project.

```sh
git clone https://github.com/independenceee/demarket-backend.git
```

then Use commands to go to the directory of the current demarket backend

```sh
cd demarket-backend
```

This tutorial requires you to have `nodejs`. If you don't have it yet, install `nodejs`. Along with nodejs, npm and npx need to check the existence of these two packages before going to the next part.

```sh
https://nodejs.org/en
```

Then install the project using `npm install` to get the necessary resources for the project

```sh
npm install
```

after the installation is done successfully use `npm run dev` to run the project

```sh
$ npm run dev
> demarket-backend@1.0.0 dev
> ts-node src/index.ts
http://localhost:5000
```

The project is running on `PORT 5000` and now you will carry out development of our project
After the project is built successfully, execute `npm run build` to build and check the output

### 2.Features: Our Backend allows users to securely execute the following functions

-   You can retrieve the properties of the blockfrost or koios APIs to query the properties to retrieve the necessary information.
-   The backend has features that make the frontend more flexible and easy to develop

### 3. License

The Demarket backend is released under the MIT. See the LICENSE file for more details.

### 4. Contact

For any questions or feedback, please contact the project maintainer at `nguyenkhanh17112003@gmail.com`.
