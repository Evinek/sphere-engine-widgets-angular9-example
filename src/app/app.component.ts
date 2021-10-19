import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogWidgetData {
  hash: string;
  theme: string|null;
  userId: string|null;
}

declare const SE: any; // IMPORTANT!!
declare const SEC: any; // IMPORTANT!!

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'widget-example';

  constructor(public compilersWidgetDialog: MatDialog, public problemsWidgetDialog: MatDialog) {}

  openProblemsWidget(hash: string, theme: string|null = null, userId: string|null = null, dialogSize: "small"|"big" = "big") {
    let height = "90%"; 
    let width = "100%"; 
    console.log(hash, theme, userId, dialogSize);
    
    if (dialogSize == "small") {
      height = "600px"; 
      width = "800px"; 
    }

    const widgetDialogRef = this.problemsWidgetDialog.open(DialogProblemsWidget, {
      data: {
        hash: hash,
        theme: theme,
        userId: userId,
      },
      height: height,
      width: width,
    });

    widgetDialogRef.afterOpened().subscribe(result => {
      SE.ready(function () {
        var widget = SE.widget("widget");
        widget.loadSourceCode(29, "<?php\n\necho 'Sphere Engine Problems Widget';\n");
      });
    });

    widgetDialogRef.afterClosed().subscribe(result => {
      SE.ready(function () {
        var widget = SE.widget("widget");
        widget.destroy();
      });
    });
  }

  openCompilersWidget(hash: string, theme: string|null = null, dialogSize: "small"|"big" = "big") {
    let height = "90%"; 
    let width = "100%"; 
    
    if (dialogSize === "small") {
      height = "600px"; 
      width = "800px"; 
    }

    const widgetDialogRef = this.compilersWidgetDialog.open(DialogCompilersWidget, {
      data: {
        hash: hash,
        theme: theme,
      },
      height: height,
      width: width,
    });

    widgetDialogRef.afterOpened().subscribe(result => {
      SEC.ready(function () {
        var widget = SEC.widget("widget");
        widget.loadSourceCode(29, "<?php\n\necho 'Sphere Engine Compilers Widget';\n");
      });
    });

    widgetDialogRef.afterClosed().subscribe(result => {
      SEC.ready(function () {
        var widget = SEC.widget("widget");
        widget.destroy();
      });
    });
  }
}

@Component({
  selector: 'dialog-problems-widget',
  templateUrl: 'dialog-problems-widget.html',
})
export class DialogProblemsWidget {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogWidgetData) {}
}

@Component({
  selector: 'dialog-compilers-widget',
  templateUrl: 'dialog-compilers-widget.html',
})
export class DialogCompilersWidget {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogWidgetData) {}
}