### How to use the gradle build

* Overview:
LabKeyModules contains all the external modules needed for the ImmuneSpace application to utilize on top of a base LabKey Server installation.  Since the Staging and Production servers use a binary installation of the LabKey Server software, LabKeyModules uses a separate gradle build system so that it can be easily installed on either a local development machine, which requires building from source, or the servers.  The build system utilizes environmental variables that dictate where to find needed resources (e.g. JAVA, Apache Tomcat, and Gradle) as well as where to deploy the final module files in order to provide this flexibility.

Instructions for setup on a local development machine:

* First setup your dev machine and basic labkey server according to the instructions in the DevOps documents in Notion.so

* Clone down LabKeyModules
cd ~
git clone https://github.com/RGLab/LabKeyModules.git
cd LabKeyModules
git checkout dev

* Install Gradle

wget https://services.gradle.org/distributions/gradle-6.5-bin.zip -P /tmp
sudo unzip -d /opt/gradle /tmp/gradle-6.5.zip

* Create an ~/LabKeyModules/.envrc file with the following vars:

export JAVA_HOME=/home/<user>/release19.3/jdk-13.0.1
export CATALINA_HOME=/home/<user>/release19.3/tomcat
export JAVA_OPTS=-Ddevmode=true

export GRADLE_DEPLOY_DIR=/home/<user>/release19.3/build/deploy
export GRADLE_LKMODS_DIR=/home/<user>/LabKeyModules
export GRADLE_EXTERNAL_MODULES_DIR=/home/<user>/release19.3/build/deploy/externalModules

export GRADLE_HOME=/opt/gradle/gradle-6.2.2
export PATH=${GRADLE_HOME}/bin:${PATH}

* Source the .envrc file

* Deploy all LabKeyModules to the $GRADLE_EXTERNAL_MODULES_DIR
~/LabKeyModules$ gradle deploy

* Alternatively, deploy a single module (e.g. DataFinder)
~/LabKeyModules$ gradle :DataFinder:deploy


Notes:
- At the project level
    - module.template.xml: used to generate the necessary meta-data file needed by LabKey server to utilize the module after it has been decompressed from the zip format.
    - settings.gradle: file defines the modules to be built.  Don't forget to add new modules there.
    - build.gradle: Checks for necessary plugins and defines locations for final zip files to be placed







