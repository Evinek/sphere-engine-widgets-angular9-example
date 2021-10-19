import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogWidgetData {
  hash: string;
  theme: string|null;
  userId: string|null;
}

declare const SE: any; // IMPORTANT!!

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'widget-example';

  constructor(public widgetDialog: MatDialog) {}

  openWidget(hash: string, theme: string|null = null, userId: string|null = null) {
    const widgetDialogRef = this.widgetDialog.open(DialogWidget, {
      data: {
        hash: hash,
        theme: theme,
        userId: userId,
      },
      height: '600px',
      width: '1000px',
    });

    widgetDialogRef.afterOpened().subscribe(result => {
      var widget = SE.widget("widget");
      widget.loadSourceCode(29, "<?php\n\necho 'Hello world';\n");
    });

    widgetDialogRef.afterClosed().subscribe(result => {
      var widget = SE.widget("widget");
      widget.destroy();
    });
  }
}

@Component({
  selector: 'dialog-widget',
  templateUrl: 'dialog-widget.html',
})
export class DialogWidget {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogWidgetData) {}
}