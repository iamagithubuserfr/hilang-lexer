// lexer.js

class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
    }

    nextToken() {
        if (this.position >= this.input.length) {
            return { type: 'EOF' };
        }

        const char = this.input[this.position];

        // Skip whitespace
        if (/\s/.test(char)) {
            this.position++;
            return this.nextToken();
        }

        // String variable declaration
        if (this.input.startsWith('hi.v.str', this.position)) {
            const regex = /hi\.v\.str\s+("[^"]*"|'[^']*')/;
            const match = regex.exec(this.input.slice(this.position));
            if (match) {
                this.position += match[0].length;
                return { type: 'STRING_DECLARATION', value: match[1] };
            }
        }

        // Integer variable declaration
        if (this.input.startsWith('hi.v.int', this.position)) {
            const regex = /hi\.v\.int\s+(\d+)/;
            const match = regex.exec(this.input.slice(this.position));
            if (match) {
                this.position += match[0].length;
                return { type: 'INT_DECLARATION', value: match[1] };
            }
        }

        // Boolean variable declaration
        if (this.input.startsWith('hi.v.bool', this.position)) {
            const regex = /hi\.v\.bool\s+(true|false)/;
            const match = regex.exec(this.input.slice(this.position));
            if (match) {
                this.position += match[0].length;
                return { type: 'BOOL_DECLARATION', value: match[1] };
            }
        }

        // Double variable declaration
        if (this.input.startsWith('hi.v.double', this.position)) {
            const regex = /hi\.v\.double\s+(\d+\.\d+)/;
            const match = regex.exec(this.input.slice(this.position));
            if (match) {
                this.position += match[0].length;
                return { type: 'DOUBLE_DECLARATION', value: match[1] };
            }
        }

        // Print statement
        if (this.input.startsWith('hi.ln', this.position)) {
            const regex = /hi\.ln\s*("[^"]*"|'[^']*')/;
            const match = regex.exec(this.input.slice(this.position));
            if (match) {
                this.position += match[0].length;
                return { type: 'PRINT', value: match[1] };
            }
        }

        // If no token matches
        this.position++;
        return { type: 'UNKNOWN', value: char };
    }
}

export { Lexer };

  