import type { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadPlus extends JwtPayload {
  uid: string;
}
