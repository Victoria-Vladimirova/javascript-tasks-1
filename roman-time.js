var hours = process.argv[2];
var minutes = process.argv[3];

hours = parseInt(hours, 10);
minutes = parseInt(minutes, 10);


// проверка корректности введенных данных
function correctTime(hours, minutes) {
    if (isNaN(hours) || isNaN(minutes) || 
        (hours < 0) || (hours > 23) || (minutes < 0) || (minutes > 59)) {
        return false;
    }
    return true;
}

if (!correctTime(hours, minutes)) {
    console.log('Время указано не верно');
    process.exit(1);
}

var arab = [1, 4, 5, 9, 10, 40, 50];
var roman = [[' OOO ', 
              '  O  ', 
              '  O  ',      //I
              '  O  ', 
              ' OOO '], 
             [' OOO ', 
              '  O  ', 
              '  O  ',
              '  O  ', 
              ' OOO ',      //IV
              'O   O',
              'O   O',
              'O   O',
              ' O O ',
              '  O  '],
             ['O   O',
              'O   O',
              'O   O',      //V
              ' O O ',
              '  O  '],
             [' OOO ', 
              '  O  ', 
              '  O  ',
              '  O  ', 
              ' OOO ',      //IX
              'O   O',
              ' O O ',
              '  O  ',
              ' O O ',
              'O   O'],
             ['O   O',
              ' O O ',
              '  O  ',      //X
              ' O O ',
              'O   O'],
             ['O   O',
              ' O O ',
              '  O  ',
              ' O O ',
              'O   O',      //XL
              'O    ',
              'O    ',
              'O    ',
              'O    ',
              'OOOOO'],
             ['O    ',
              'O    ',
              'O    ',      //L
              'O    ',
              'OOOOO']]

var extChar = [['     ',
                '  o  ',
                '     ',        //:
                '  o  ',
                '     '],
               ['     ',
                '     ',
                'OOOOO',        //- (для цифры 0)
                '     ',
                '     ']]

var H = 5; // высота символов


// перевод в строковое представление для вывода
function getAscii(romanTime, H) {
    var res = '';
    for (var i = 0; i < H; i++) {
        for (var j = 0; j < romanTime.length; j += H) {
            res += romanTime[j+i];
        }
        res += '\n';
    }
    return res;
}


// перевод арабского числа в римское представление
function toRoman(number) {
    if (number == 0) {
        return extChar[1];
    }
    var res = [];
    var ind = arab.length - 1;
    while (number > 0) {
        if (number >= arab[ind]) {
            res = res.concat(roman[ind]);
            number -= arab[ind];
        }
        else {
            ind--;
        }
    }
    return res;
}

var romanTime = toRoman(hours);
romanTime = romanTime.concat(extChar[0]); // добавить :
var minutesRoman = toRoman(minutes);
romanTime = romanTime.concat(minutesRoman);
console.log(getAscii(romanTime, H));
