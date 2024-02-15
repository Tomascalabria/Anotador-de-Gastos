var express = require('express');
const Expense = require('../Models/Expense');
const User=require('../Models/User')
const AuthApi = require('splitwise-node');

var router = express.Router();
const userCredentials = {};

// Assuming you have the consumer key and secret set in process.env
const consumerKey = process.env.consumer_key;
const consumerSecret = process.env.consumer_secret;

router.get('/splitwise_auth', async (req, res) => {
  const authApi = new AuthApi(consumerKey, consumerSecret);
  const userId = req.body.user_id;

  try {
    // Get the OAuth request token
    const { token, secret } = await authApi.getOAuthRequestToken();

    // Save the temporary credentials for the user
    userCredentials[userId] = { token, secret };

    // Get the authorization URL
    const authUrl = authApi.getUserAuthorisationUrl(token);
  console.log(userCredentials)
    // Send the authorization URL back to the client
    res.json({ authUrl });
  } catch (error) {
    console.error('Error getting OAuth request token:', error);
    res.status(500).send('Error during authentication');
  }
});

router.get('/splitwise_credentials', async (req, res) => {
  // Extract OAuth token and verifier from the query parameters
  const oauthToken = req.query.oauth_token;
  const oauthVerifier = req.query.oauth_verifier;
  const userId = ''; // You need to replace this with the actual user ID.

  // Retrieve the temporary credentials for the user
  const userCredentialsForUserId = userCredentials[userId];

  if (!userCredentialsForUserId || !userCredentialsForUserId[oauthToken]) {
    return res.status(400).send('Invalid OAuth token');
  }

  // Use the temporary credentials to get the OAuth access token
  const authApi = new AuthApi(consumerKey, consumerSecret);
  try {
    const { oAuthAccessToken, oAuthAccessTokenSecret } = await authApi.getOAuthAccessToken(
      oauthToken,
      userCredentialsForUserId[oauthToken].secret,
      oauthVerifier
    );

    // Update the user's Splitwise credentials in the database
    const user = await User.findOneAndUpdate(
      { _id: userId, 'splitwiseCredentials.token': oauthToken },
      {
        $set: {
          'splitwiseCredentials.token': oAuthAccessToken,
          'splitwiseCredentials.secret': oAuthAccessTokenSecret,
        },
      },
      { new: true }
    );
    

    // Respond with a success message
    console.log(user)
    res.send('Splitwise credentials saved successfully!');
  } catch (error) {
    console.error('Error getting OAuth access token:', error);
    res.status(500).send('Error during authentication');
  }
});


router.delete('/delete/:id',async(req,res)=>{
    // I should lookup the user in DB in order to validate it against the expense.

    try{
        const expense= await Expense.findById(req.params.id)
    if(req.headers.username==expense.creator||req.headers.admin==true){
          const deletedItem=  await expense.delete((error,response)=>{
            if (error){
                throw {
                    status: 401,
                    json: {
                      status: "Error",
                      message: `You are not able to perform this task.`,
                      data:null
                    }
                }}
                else{
                    res.status(200).json({
                        status: "Success",
                        message: `Expense has deleted correctly! `,
                        data: expense.title
                    })
                }
            }


          )}
    }
 
        
      
    
    catch(err){
        res.send(err)
    }
}
)


router.post('/create',async(req,res)=>{
    const expenseAmount=(req.body.amount/(req.body.participants.length+[req.body.creator].length)).toFixed()

 
    const newExpense=new Expense({
        title:req.body.title,
        type:req.body.type,
        category:req.body.category,
        amount: expenseAmount,
        creator:req.body.creator,
        participants:req.body.participants
        
    })  
    
    try{
        
        let savedExpense= await newExpense.save((err,response)=>{
            if(err){
                console.log(err)
            }
            
            res.status(200).json({
                status: 200,
                message: `Expense has been added correctly! `,
                data: savedExpense
            });
            req.body.participants.map((item)=>{
                console.log('Friend: '+ item)
            })
            console.log('Friend: '+ req.body.creator)
            console.log((req.body.amount/(req.body.participants.length+[req.body.creator].length)))
        })
      
        
    
}
    catch(err){
        throw {
            status: 401,
            json: {
              status: "Error",
              message: `Sorry, there has been an internal server error`,
              data:null
            }
          }
        
    }
})


module.exports = router;