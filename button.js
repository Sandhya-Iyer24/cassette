class Button {
    constructor(x, y, w, h, handler) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.state = false;
        this.handler = handler;
    }

    display() {
        rectMode(CENTER);
        strokeWeight(3);
        stroke(255);
        noFill();
        rect(this.x, this.y, this.w, this.h);
    }

    isClickedOn() {
        if (dist(this.x, this.y, mouseX, mouseY) < this.w / 2) { // calculating if mouse is on button
            //button was clicked
            this.state = !this.state; // toggle on/off in state
            return true;
        } else {
            return false;
        }
    }

    handleIt() {
        if (this.handler) {
            this.handler();
        }
    }
}

class SideButton extends Button {
    display() {
        super.display();
        textSize(50);
        textFont("Helvetica");
        fill(255);
        if (this.state) {
            text("B", 179, 457);
        } else {
            text("A", 179, 457)
        }
    }
}

class ImageButton extends Button { 
    constructor(image, x, y, w, h, handler) { // taking information about button in constructor
        super(x, y, w, h, handler);
        this.image = image; // sets instance variables
    }

    display() {
        image(this.image, this.x, this.y, this.w, this.h);
    }
}

class CircleButton extends Button { // circle buttons for under tape
    display() {
        strokeWeight(4);
        stroke(255);
        if (this.state) {
            fill(255);
        } else {
            noFill();
        }
        ellipse(this.x, this.y, this.w, this.h); // displays circle button
    }
    isClickedOn() {
        return super.isClickedOn(); // same properties if clicked on as Button
    }
}

class CircleButtonWithLabel extends CircleButton { // created right buttons with labels
    constructor(label, x, y, w, h, handler){ // constructor to take information about each label button
        super(x, y, w, h, handler);
        this.label = label; // sets instance variable
    }

    display() {
        super.display(); // same diplay function as CircleButton
        fill(255);
        noStroke();
        textSize(30);
        textFont("Helvetica");
        text(this.label, this.x + 20, this.y + 7); // text properties and location
    }
}
