const fs = require("fs").promises;
const fs_ = require("fs");
const { execSync } = require("child_process");
const ghpages = require("gh-pages");
const axios = require("axios");
const { Octokit } = require("@octokit/rest");
const path = require("path");

class RUN {
  constructor() {
    this.GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    this.GITHUB_REPO_URL = process.env.GITHUB_REPO_URL;
    this.GITHUB_REPO_OWNER = process.env.GITHUB_REPO_URL.split("/")[0];
    this.GITHUB_REPO_NAME = process.env.GITHUB_REPO_URL.split("/")[1];
    this.RELEASE_VERSION = process.env.GITHUB_REF_NAME;
  }

  async getLatestReleaseId() {
    try {
      const octokit = new Octokit({
        auth: this.GITHUB_TOKEN,
      });

      const response = await octokit.repos.getLatestRelease({
        owner: this.GITHUB_REPO_OWNER,
        repo: this.GITHUB_REPO_NAME,
      });

      return response.data.id;
    } catch (error) {
      console.error("Error fetching latest release:", error.message);
      return null;
    }
  }

  async getReleaseDetails(releaseId) {
    try {
      const octokit = new Octokit({
        auth: this.GITHUB_TOKEN,
      });

      const response = await octokit.repos.getRelease({
        owner: this.GITHUB_REPO_OWNER,
        repo: this.GITHUB_REPO_NAME,
        release_id: releaseId,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching release details:", error.message);
      return null;
    }
  }

  async build() {
    try {
      const releaseId = await this.getLatestReleaseId();
      const releaseDetails = await this.getReleaseDetails(releaseId);
      const version = releaseDetails.tag_name;

      await this.publishRelease(version, releaseId);
    } catch (error) {
      console.error("Error publishing release:", error.message);
    }
  }

  async publishRelease(version, releaseId) {
    try {
      const changelogPath = path.join(__dirname, "..", "..", `CHANGELOG.md`);
      const changelogContent = await fs.readFile(changelogPath, "utf-8");

      const out = changelogContent.split(`#### [`);
      const body_ = `\n#### [` + out[1];

      var textArray = await this.splitTextToArray(body_);
      textArray.splice(3, 4);
      const body = textArray.join("\n");

      fs.writeFile(changelogPath, body, function (err) {
        if (err) return console.log(err);
      });

      // Publish the release
      const octokit = new Octokit({
        auth: this.GITHUB_TOKEN,
      });

      await octokit.repos.updateRelease({
        owner: this.GITHUB_REPO_OWNER,
        repo: this.GITHUB_REPO_NAME,
        release_id: releaseId,
        name: `Release ${version}`,
        body: body,
        draft: false,
      });

      console.log(`Release ${version} published successfully!`);
    } catch (error) {
      console.error("Error publishing release:", error.message);
    }
  }
}

async function run() {
  const run = new RUN();
  const dat = await run.build();
  console.log(dat);
}

run();
