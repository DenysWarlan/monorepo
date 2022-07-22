import * as mongoose from 'mongoose';

export class DBHelper {
  static init(): void {
    const uri = 'mongodb+srv://Denis:Q0KgYRqTLBPH8RMH@cluster0.e5g4l.mongodb.net/?retryWrites=true&w=majority/app.db';
    mongoose
      .connect(uri)
      .then(() => console.log('Connection to mongoDB successful'))
      .catch((e: Error) => console.log(`Could not connect to mongo.\n\n${e}`));
  }
}
