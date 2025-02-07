 // By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Generate a tweet about social and economic inequality in the UK. Where possible, it should show that the decline in quality of life is related to tax avoidance by superrich people and corporations and contract that with the much less significant impact of immigration.  Include a relevant statistic from a reputable source (e.g., ONS, IFS, Resolution Foundation, Joseph Rowntree Foundation) and link it to a current news headline or topic related to inequality (e.g., cost of living crisis, inflation, wage stagnation, poverty, wealth gap).  The tweet should be under 280 characters and include relevant hashtags (e.g., #Inequality #UKPolitics #CostOfLivingCrisis #Poverty #WealthGap).  Vary the statistic and headline each time. You may include emojis. The content should be in UK English and be a maximum of 250 characters including any links and emojis";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
