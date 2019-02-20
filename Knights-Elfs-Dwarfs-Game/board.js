var createBoard =  {
     draw : function() {
        // Main entry point got the HTML5 chess board example
        canvas = document.getElementById('chess');

        // Canvas supported?
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');

            // Calculdate the precise block size
            BLOCK_SIZE = canvas.height / 9;  ///NUMBER_OF_ROWS;

            // Draw the background
            this.drawBoard();

            // Draw pieces
        }
        else {
            alert("Canvas not supported!");
        }
    },

    drawBoard : function(){
        for (rowCounter = 0; rowCounter < 9; rowCounter++) {
            this.drawRow(rowCounter);
        }

        // Draw outline
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, 9 * BLOCK_SIZE, 7 * BLOCK_SIZE);
    },

     drawRow : function(iRowCounter) {
        // Draw 8 block left to right
        for (blockCounter = 0; blockCounter < 7; blockCounter++) {
            this.drawBlock(rowCounter, blockCounter);
        }
    },

    drawBlock : function (rowCounter, blockCounter) {
        // Set the background
        ctx.fillStyle = this.getBlockColour(rowCounter, blockCounter);

        // Draw rectangle for the background
        ctx.fillRect(rowCounter * BLOCK_SIZE, blockCounter * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        ctx.stroke();
    },

     getBlockColour : function(rowCounter, blockCounter) {
        var cStartColour;

        // Alternate the block colour
        if (blockCounter == 2 || blockCounter == 3 || blockCounter == 4) {
            cStartColour = "#A9A9A9";
            return cStartColour;
        }
        if (rowCounter % 2)
            cStartColour = (blockCounter % 2 ? 'gray' : 'black');
        else
            cStartColour = (blockCounter % 2 ? 'black' : 'gray');

        return cStartColour;
    }
};