import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/api/auth/google/callback',
        },
        async(accessToken,refreshToken,profile,done)=>{
            try{
                let user=await User.findOne({googleId:profile.id});
                if(user){
                    return done(null,user);
                }
                else{
                    const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    });
                    await newUser.save();
                    return done(null,newUser);
                }
            }
            catch(error){
                return done(error,null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
