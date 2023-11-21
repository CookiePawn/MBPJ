import axios from 'axios';


const apiKey = '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'





//스타트업 정보 gpt 평가
export const openAIStartup = async (title, introduce, stack) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', content: `너의 역할은 조건을 보고 설명에 대한 점수와 평가를 내줘. 


                    조건
                    
                    
                    * 응답 형식: 챗봇은 JSON 형식으로 응답합니다. {"score": "", "evaluation": ""}
                    * 점수 계산: score는 1의 자리수까지 계산되며, 소수점은 없고, 100점 만점입니다.
                    * 평가 기준: evaluation은 간단하고 일관성 있어야 하며, 몇 문장으로 요약됩니다.
                    * 엄격한 점수 기준: 스타트업 이름, 주요 사업 영역, 소개, 기술 및 스택, 시장 적합성 및  경쟁력, 팀 및 경험이 없다면 score가 20점 아래로 있다면 score가 20점 이상`},

                    { role: 'user', content: `이 글에 대한 점수를 알려줘 : 이 스타트업은 ${title}에 관한 기업이다. 소개글은 ${introduce}이고 기술 및 스택은 ${stack}이다.` },
                ],
                max_tokens: 500,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                }
            }
        )

        //대답
        //console.log(response.data.choices[0].message.content)

        try {
            // 데이터를 파싱하여 점수와 평가를 추출합니다.
            const content = JSON.parse(response.data.choices[0].message.content);  

            const result = {
                score: content.score,
                evaluation: content.evaluation,
            }

            return result
        } catch (error) {
            console.error('JSON Parse error:', error)
        }

        

        


    } catch (error) {
        console.error('Error text: ', error.response.data.error.message)
    }
}








//사용자 정보 gpt 평가
export const openAIUser = async (info, introduce, career, project) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', content: `너의 역할은 조건을 보고 설명에 대한 점수와 평가를 내줘. 


                    조건
                    
                    
                    * 응답 형식: 챗봇은 JSON 형식으로 응답합니다. {"score": "", "evaluation": ""}
                    * 점수 계산: score는 1의 자리수까지 계산되며, 소수점은 없고, 100점 만점입니다.
                    * 평가 기준: evaluation은 간단하고 일관성 있어야 하며, 몇 문장으로 요약됩니다.
                    * 엄격한 점수 기준: 직조 설명 경력 및 프로젝트 개수등 정보가 없다면 score가 20점, 정보가 많으면 score가 20점 이상`},

                    { role: 'user', content: `이 글에 대한 점수를 알려줘 : 이 사람의 직종은 ${info}이다. 자신의 설명은 ${introduce}이고 경력은 ${career}이다. 마지막으로 프로젝트는 ${project}이런 것을 했다.` },
                ],
                max_tokens: 500,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                }
            }
        )

        //대답
        //console.log(response.data.choices[0].message.content)

        try {
            // 데이터를 파싱하여 점수와 평가를 추출합니다.
            const content = JSON.parse(response.data.choices[0].message.content);  

            const result = {
                score: content.score,
                evaluation: content.evaluation,
            }

            return result
        } catch (error) {
            console.error('JSON Parse error:', error)
        }

        

        


    } catch (error) {
        console.error('Error text: ', error.response.data.error.message)
    }
}






//스타트업에 대한 이미지 생성
export const startupDALLE = async (name, title, introduce) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: `Create an image for ${title}. I wish the photo had the letters ${name} in it.`,
                n: 1, // 생성할 이미지의 수
                size: "256x256" // 이미지의 크기
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );

        // API로부터 반환된 이미지 URL 추출
        const imageUrl = response.data.data[0].url;

        return imageUrl;
    } catch (error) {
        console.error('Error in DALL-E Image Generation:', error.response.data.error.message);
        return null;
    }
};


