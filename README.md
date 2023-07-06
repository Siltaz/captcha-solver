# Captcha Solver Service

This is a captcha solver service that takes an image URL, downloads it, and returns the recognized captcha from the image. It can also solves mathematical captcha as well. It uses Tesseract.js, a JavaScript library for optical character recognition (OCR), to recognize the text in the captcha image.

## Prerequisites

Before running the service, make sure you have the following prerequisites installed:

- Node.js (version 10 or higher)
- NPM (Node Package Manager) or Yarn

## Installation

1. Clone the repository or download the source code.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Configuration

The service uses environment variables for configuration. Create a `.env` file in the project directory and provide the following variables:

- `NODE_ENV` (optional): Specifies the environment (e.g., development, production). If not specified, it defaults to development.
- `APP_PORT` (optional): Specifies the port number on which the service should listen. If not specified, it defaults to 3000.

## Usage

1. Start the service by running the following command:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. Once the service is running, you can make a request to the `/solve_captcha` endpoint with the following query parameters:

   - `uri`: The URL of the captcha image to be solved.

   Example request:

   ```
   GET http://localhost:3000/solve_captcha?uri=https://raw.githubusercontent.com/Siltaz/captcha-solver/master/sample/mathematical_captcha.png
   ```

   <img src="sample/normal_captcha.png" alt="Normal Captcha" height="50" width="200"/>
   <img src="sample/mathematical_captcha.png" alt="Mathematical Captcha" height=50" width="200"/>

   The service will download the image, perform OCR using Tesseract.js, and return the recognized captcha in the response.

   Example response:

   ```json
   {
     "result": "2"
   }
   ```

   Note: The example code provided assumes that the captcha is in the format of a mathematical expression that can be evaluated using `eval()`. You may need to modify the code according to your specific captcha format.

## Error Handling

If any errors occur during the captcha solving process, the service will return an error response with the corresponding HTTP status code and error message.

Example error response:

```json
{
  "error": "Failed to download image"
}
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you find any issues or want to enhance the functionality, feel free to open a pull request.

## Credits

This service was created using the following libraries:

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Tesseract.js](https://tesseract.projectnaptha.com/) - JavaScript library for OCR (optical character recognition).
- [cors](https://www.npmjs.com/package/cors) - Express middleware for enabling Cross-Origin Resource Sharing (CORS).
- [helmet](https://helmetjs.github.io/) - Express middleware for securing HTTP headers.
- [hpp](https://www.npmjs.com/package/hpp) - Express middleware for preventing HTTP parameter pollution attacks.

## Contact

If you have any questions or suggestions, feel free to contact the project maintainer at [siltaz@proton.me](mailto:siltaz@proton.me).