import ApiRepository from "./ApiRepository";

class GitHubApiRepository extends ApiRepository {
  constructor() {
    super("https://api.github.com");
  }

  getClosedPullRequests() {
    return this.get("/repos/csiew/website/pulls", {"state": "closed"})
  }
}

const githubApiRepository = new GitHubApiRepository();

export default githubApiRepository;
