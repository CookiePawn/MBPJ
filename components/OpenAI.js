import axios from 'axios';


const apiKey = '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'




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
                    * 점수 계산: score는 1의 자리수까지 계산되며, 100점 만점입니다.
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









export const openAIUser = async (name, title, introduce, stack) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', content: `너의 역할은 조건을 보고 설명에 대한 점수와 평가를 내줘. 


                    조건
                    
                    
                    * 응답 형식: 챗봇은 JSON 형식으로 응답합니다. {"score": "", "evaluation": ""}
                    * 점수 계산: score는 1의 자리수까지 계산되며, 100점 만점입니다.
                    * 평가 기준: evaluation은 간단하고 일관성 있어야 하며, 몇 문장으로 요약됩니다.
                    * 엄격한 점수 기준: 스타트업 이름, 주요 사업 영역, 소개, 기술 및 스택, 시장 적합성 및  경쟁력, 팀 및 경험이 없다면 score가 20점 아래로 있다면 score가 20점 이상`},

                    { role: 'user', content: `이 글에 대한 점수를 알려줘 : 스타트업의 이름은${name}이고 ${title}에 관한 스타트업이다. 소개글은 ${introduce}이고 기술 및 스택은 ${stack}이다.` },
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