class Piano {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.octaves = [3, 4, 5];
        this.activeNotes = new Map();
        this.keyElements = new Map();
        this.init();
    }

    init() {
        const piano = document.getElementById('piano');
        
        // 创建白键容器
        const whiteKeysContainer = document.createElement('div');
        whiteKeysContainer.style.position = 'relative';
        whiteKeysContainer.style.display = 'flex';
        piano.appendChild(whiteKeysContainer);

        // 创建黑键容器
        const blackKeysContainer = document.createElement('div');
        blackKeysContainer.style.position = 'absolute';
        blackKeysContainer.style.top = '0';
        blackKeysContainer.style.left = '0';
        blackKeysContainer.style.width = '100%';
        blackKeysContainer.style.height = '100%';
        piano.appendChild(blackKeysContainer);

        this.octaves.forEach(octave => {
            this.notes.forEach((note, index) => {
                const isBlack = note.includes('#');
                const key = document.createElement('div');
                key.className = `key ${isBlack ? 'black' : ''}`;
                
                const label = document.createElement('div');
                label.className = 'key-label';
                label.textContent = `${note}${octave}`;
                key.appendChild(label);

                const frequency = this.getFrequency(note, octave);
                
                key.addEventListener('mousedown', () => this.playNote(frequency, key));
                key.addEventListener('mouseup', () => this.stopNote(frequency, key));
                key.addEventListener('mouseleave', () => this.stopNote(frequency, key));
                
                if (isBlack) {
                    // 计算黑键的位置
                    const whiteKeyWidth = 60; // 白键宽度
                    const blackKeyOffset = 40; // 黑键偏移量
                    const position = index * whiteKeyWidth - blackKeyOffset;
                    key.style.position = 'absolute';
                    key.style.left = `${position}px`;
                    blackKeysContainer.appendChild(key);
                } else {
                    whiteKeysContainer.appendChild(key);
                }
                
                this.keyElements.set(`${note}${octave}`, key);
            });
        });

        // 添加键盘事件监听
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    getFrequency(note, octave) {
        const noteIndex = this.notes.indexOf(note);
        return 440 * Math.pow(2, (noteIndex - 9 + (octave - 4) * 12) / 12);
    }

    playNote(frequency, key) {
        if (this.activeNotes.has(frequency)) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        this.activeNotes.set(frequency, { oscillator, gainNode });
        key.classList.add('active');
    }

    stopNote(frequency, key) {
        const note = this.activeNotes.get(frequency);
        if (note) {
            note.gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.03);
            note.oscillator.stop(this.audioContext.currentTime + 0.03);
            this.activeNotes.delete(frequency);
            key.classList.remove('active');
        }
    }

    handleKeyDown(e) {
        const keyMap = {
            // 第一组八度 (3)
            '1': { note: 'C', octave: 3 },
            'q': { note: 'C#', octave: 3 },
            '2': { note: 'D', octave: 3 },
            'w': { note: 'D#', octave: 3 },
            '3': { note: 'E', octave: 3 },
            '4': { note: 'F', octave: 3 },
            'r': { note: 'F#', octave: 3 },
            '5': { note: 'G', octave: 3 },
            't': { note: 'G#', octave: 3 },
            '6': { note: 'A', octave: 3 },
            'y': { note: 'A#', octave: 3 },
            '7': { note: 'B', octave: 3 },
            
            // 第二组八度 (4)
            '8': { note: 'C', octave: 4 },
            'i': { note: 'C#', octave: 4 },
            '9': { note: 'D', octave: 4 },
            'o': { note: 'D#', octave: 4 },
            '0': { note: 'E', octave: 4 },
            'p': { note: 'F', octave: 4 },
            '[': { note: 'F#', octave: 4 },
            'a': { note: 'G', octave: 4 },
            's': { note: 'G#', octave: 4 },
            'd': { note: 'A', octave: 4 },
            'f': { note: 'A#', octave: 4 },
            'g': { note: 'B', octave: 4 },
            
            // 第三组八度 (5)
            'h': { note: 'C', octave: 5 },
            'j': { note: 'C#', octave: 5 },
            'k': { note: 'D', octave: 5 },
            'l': { note: 'D#', octave: 5 },
            ';': { note: 'E', octave: 5 },
            "'": { note: 'F', octave: 5 },
            ']': { note: 'F#', octave: 5 },
            'z': { note: 'G', octave: 5 },
            'x': { note: 'G#', octave: 5 },
            'c': { note: 'A', octave: 5 },
            'v': { note: 'A#', octave: 5 },
            'b': { note: 'B', octave: 5 }
        };

        const key = keyMap[e.key.toLowerCase()];
        if (key) {
            const frequency = this.getFrequency(key.note, key.octave);
            const keyElement = this.keyElements.get(`${key.note}${key.octave}`);
            if (keyElement) {
                this.playNote(frequency, keyElement);
            }
        }
    }

    handleKeyUp(e) {
        const keyMap = {
            // 第一组八度 (3)
            '1': { note: 'C', octave: 3 },
            'q': { note: 'C#', octave: 3 },
            '2': { note: 'D', octave: 3 },
            'w': { note: 'D#', octave: 3 },
            '3': { note: 'E', octave: 3 },
            '4': { note: 'F', octave: 3 },
            'r': { note: 'F#', octave: 3 },
            '5': { note: 'G', octave: 3 },
            't': { note: 'G#', octave: 3 },
            '6': { note: 'A', octave: 3 },
            'y': { note: 'A#', octave: 3 },
            '7': { note: 'B', octave: 3 },
            
            // 第二组八度 (4)
            '8': { note: 'C', octave: 4 },
            'i': { note: 'C#', octave: 4 },
            '9': { note: 'D', octave: 4 },
            'o': { note: 'D#', octave: 4 },
            '0': { note: 'E', octave: 4 },
            'p': { note: 'F', octave: 4 },
            '[': { note: 'F#', octave: 4 },
            'a': { note: 'G', octave: 4 },
            's': { note: 'G#', octave: 4 },
            'd': { note: 'A', octave: 4 },
            'f': { note: 'A#', octave: 4 },
            'g': { note: 'B', octave: 4 },
            
            // 第三组八度 (5)
            'h': { note: 'C', octave: 5 },
            'j': { note: 'C#', octave: 5 },
            'k': { note: 'D', octave: 5 },
            'l': { note: 'D#', octave: 5 },
            ';': { note: 'E', octave: 5 },
            "'": { note: 'F', octave: 5 },
            ']': { note: 'F#', octave: 5 },
            'z': { note: 'G', octave: 5 },
            'x': { note: 'G#', octave: 5 },
            'c': { note: 'A', octave: 5 },
            'v': { note: 'A#', octave: 5 },
            'b': { note: 'B', octave: 5 }
        };

        const key = keyMap[e.key.toLowerCase()];
        if (key) {
            const frequency = this.getFrequency(key.note, key.octave);
            const keyElement = this.keyElements.get(`${key.note}${key.octave}`);
            if (keyElement) {
                this.stopNote(frequency, keyElement);
            }
        }
    }
}

// 初始化钢琴
window.addEventListener('load', () => {
    new Piano();
}); 