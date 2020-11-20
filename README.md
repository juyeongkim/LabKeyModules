LabKeyModules
=============

Contained in this repo are LabKey External Modules that can be used within the ImmuneSpace Portal, mainly as webparts.  To learn more about an individual module, you can look at the <module>/module.properties "description" to see the purpose.

To add a new React-based module, it easiest to copy over a current react-module and then slim down to the following structure:

- ModuleName
    - src / client
        - app.tsx (Production mode renders react component "App" to the app div from app.template.html)
        - dev.tsx (Development mode renders react component "App" to the app div from app.template.html)
        - moduleName.tsx (Script defining the React Highest Order Component "App") **
    - Webpack (Static Module Bundler)
        - app.template.html (highest level html file holding "app" div that react targets)
        - app.view.template.xml (LabKey xml file describing js and css dependencies) **
        - app.webpart.template.xml (LabKey xml file allowing for use as webpart)
        - constants.js (defines Style and TypeScript loaders)
        - dev.config.js (Development mode configuration file)
        - entryPoints.js (LabKey-specific configuration file) **
        - prod.config.js (Production mode configuration file)
    - .nprmc (npm configuration file)
    - build.gradle (Gradle's build file for the specific module) **
    - module.properties (meta-data file used by Gradle for building zip file to hand off to LabKey Server) **
    - package.json (npm meta-data file used for managing dependencies, scripts, version, etc) **
    - postcss.config.js (Post CSS Processing Configuration File)
    - tsconfig.json (TypeScript Configuration file)

Files marked with ** are those that will need to be updated for the new module.

At the project level, you will need to add the module to the settings.gradle file in order for it to be built using <LabKeyModules>$ gradle deploy. 

Older ext.js modules do not need to built in the same manner as the react-based modules and will have a different structure that is prescribed by LabKey in their documentation: https://www.labkey.org/Documentation/wiki-page.view?name=simpleModules. 