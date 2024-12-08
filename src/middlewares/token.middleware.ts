import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JWT_SECRET } from '@/config/jwt-options';
import { prisma } from '@/lib/prisma';
import Token from '@/interfaces/token.interface';
import { excludeFields } from '@/utils/data-transformers';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const callback = async (payload: Token, done: VerifiedCallback) => {
  const user = await prisma.user.findUnique({
    where: { id: payload.id, email: payload.email },
  });
  const authUser = excludeFields(user, ['password']);
  if (authUser) {
    return done(null, authUser);
  } else {
    return done(null, false);
  }
};

passport.use(new JwtStrategy(options, callback));

export const initializePassport = () => passport.initialize();
export const authenticateJwt = passport.authenticate('jwt', { session: false });
