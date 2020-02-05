import { NotificationManager } from 'react-notifications';


export class NotificationService {
    createNotification = (msg: string, type: string) => {
        console.log(123)
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info(msg);
              break;
            case 'success':
              NotificationManager.success(msg, 'Title here');
              break;
            case 'warning':
              NotificationManager.warning(msg, 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error(msg, 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
}