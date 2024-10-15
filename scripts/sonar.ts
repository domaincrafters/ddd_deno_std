import scanner from "@sonarqube/sonarqube";
scanner(
  {
    serverUrl: "https://sonarqube.ti.howest.be/",
    options: {
      "sonar.token": Deno.env.get("SONARQUBE_TOKEN"),
      "sonar.host.url": "https://sonarcloud.io/",
      "sonar.projectKey": "domaincrafters.deno.std",
      "sonar.projectName": "domaincrafters.deno.std",
      "sonar.organization": "domaincrafters",
      "sonar.newCodePeriod": "previous_version",
      "sonar.qualitygate": "DDD",
      "sonar.sources": "src",
      "sonar.tests": "tests",
      "sonar.javascript.lcov.reportPaths": "coverage.lcov",
    },
  },
  (error: unknown) => {
    if (error) {
      console.error("SonarQube analysis failed:", error);
      Deno.exit(1);
    } else {
      console.log("SonarQube analysis is complete");
    }
  }
);