import scope from 'tape';
import MidiMessageDefinitions from '../../../src/lib/MidiMessageDefinitions';

scope('src/lib/MidiMessageDefinitions.js', (scope) => {

    scope.test('Must be a object', (assert) => {
        assert.equals(typeof MidiMessageDefinitions, 'object', 'Is not an object');
        assert.end();
    });

    scope.test('Must have a "get" function ', (assert) => {
        assert.equals(typeof MidiMessageDefinitions.get, 'function', 'Is not a function');
        assert.end();
    });

    scope.test('Must be able to "get" definition by byteCode ', (assert) => {
        // Arrange
        const byteCode = '10000000';

        // Act
        const definition = MidiMessageDefinitions.get(byteCode);

        // Assert
        assert.equals(definition.byteCode, byteCode, 'Is not correct MidiMessageDefinition');
        assert.end();
    });

    scope.test('Must be able to "get" definition by byteCode ', (assert) => {
        // Arrange
        const numberCode = 128;

        // Act
        const definition = MidiMessageDefinitions.get(numberCode);

        // Assert
        assert.equals(definition.numberCode, numberCode, 'Is not correct MidiMessageDefinition');
        assert.end();
    });

    scope.test('Must have a "exists" function ', (assert) => {
        assert.equals(typeof MidiMessageDefinitions.exists, 'function', 'Is not a function');
        assert.end();
    });

    scope.test('Must be able to "exists" definition by byteCode ', (assert) => {
        // Arrange
        const byteCode = '10000000';

        // Act
        const exists = MidiMessageDefinitions.exists(byteCode);

        // Assert
        assert.ok(exists, 'Is not correct MidiMessageDefinition');
        assert.end();
    });

    scope.test('Must be able to "exists" definition by byteCode ', (assert) => {
        // Arrange
        const numberCode = 128;

        // Act
        const exists = MidiMessageDefinitions.exists(numberCode);

        // Assert
        assert.ok(exists, 'Is not correct MidiMessageDefinition');
        assert.end();
    });

    scope.test('Must contain definitions from 128 till 255', (assert) => {
        for (let numberCode = 128; numberCode <= 255; numberCode++) {
            const exists = MidiMessageDefinitions.exists(numberCode);
            assert.ok(exists, 'Is not correct MidiMessageDefinition');
        }
        assert.end();
    });

});
