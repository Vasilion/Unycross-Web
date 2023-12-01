This directory houses scripts that are used to generate
Angular code based on the swagger definition of the API.

Each script can be ran in powershell with `./<scriptname>`.

How to use this:

Run the script in `scripts/download.ps1`, this will give you a global openapi package.

Run the script in `scripts/generate.ps1`, this will download the `swagger.json` file
from our API. It then creates models and services based off this definition.
These files get copied over into `src/app/api/models|services`, which is where
our Angular app will import them from.
