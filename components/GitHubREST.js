
//github rest api
import { Octokit } from "@octokit/core";




const octokit = new Octokit();


//사용자 프로젝트 사용 코드 불러오기
export const fetchLang = async () => {
    try {
        const repos = await loadRepositories();
        if (repos) {
            for (const repo of repos) {
                const response = await octokit.request('GET /repos/{owner}/{repo}/languages', {
                    owner: 'CookiePawn',
                    repo: repo
                });
                console.log(`Languages for ${repo}:`, response.data);
            }
        }
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
}


//사용자 리포지토리 불러오기
const loadRepositories = async () => {
    try {
        const response = await octokit.request('GET /users/{owner}/repos', {
            owner: 'CookiePawn',
            per_page: 100  // 한 페이지당 최대 리포지토리 수 (최대 100)
        });
        return response.data.map(repo => repo.name);
    } catch (error) {
        console.error("Error fetching user repositories:", error);
    }
}




