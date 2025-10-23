Feature:Reset Password

Scenario: Reset password successfully
Given you are on the sign in page 
When you click on Forgot Password 
Then the system will send an email reset link
And you click on the reset link in the email 
Then you will be redirected to the reset password page 
When you enter a new password and confirm it 
Then your password will be reset successfully
And you will receive a confirmation email about the password change

Scenario: Reset password with invalid email
Given you are on the sign in page 
When you click on Forgot Password 
Then you enter an invalid email address
When you submit the reset request
Then you will see an error message indicating the email is not registered       
And you will not receive any reset email    

Scenario: Reset password with mismatched passwords
Given you are on the reset password page via the email link 
When you enter a new password and a different confirmation password 
Then you will see an error message indicating the passwords do not match
When you try to submit the form
Then the password will not be reset
And you will remain on the reset password page