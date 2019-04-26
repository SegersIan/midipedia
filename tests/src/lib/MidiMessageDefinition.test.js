import scope from 'tape';
import MidiMessageDefinition from '../../../src/lib/MidiMessageDefinition';

scope('src/lib/MidiMessageDefinition.js', (scope) => {

    scope.test('Must be a function', (assert) => {
        assert.equals(typeof MidiMessageDefinition, 'function', 'Is not a function');
        assert.end();
    });

    scope.test('When called as constructor function', (scope) => {

        scope.test('Must throw if byteCode is not a string', (assert) => {
            // Arrange
            const data = { byteCode: 1 };

            // Act
            const fn = () => new MidiMessageDefinition(data);

            // Assert
            assert.throws(fn, /ByteCode is not a string/i, 'Did not throw proper error');
            assert.end();
        });

        scope.test('Must throw if byteCode is not a byte representation.', (assert) => {
            // Arrange
            const data = { byteCode: '20000000' };

            // Act
            const fn = () => new MidiMessageDefinition(data);

            // Assert
            assert.throws(fn, /ByteCode is a not a valid Status byte, must start with "1"/i, 'Did not throw proper error');
            assert.end();
        });

        scope.test('Must throw if label is not a string', (assert) => {
            // Arrange
            const data = { byteCode: '10000000', label: 1 };

            // Act
            const fn = () => new MidiMessageDefinition(data);

            // Assert
            assert.throws(fn, /Label has no value/i, 'Did not throw proper error');
            assert.end();
        });

        scope.test('Must throw if dataBytes is not an Array.', (assert) => {
            // Arrange
            const data = { byteCode: '10000000', label: 'some label', dataBytes: 'hello' };

            // Act
            const fn = () => new MidiMessageDefinition(data);

            // Assert
            assert.throws(fn, /DataBytes must be an array/i, 'Did not throw proper error');
            assert.end();
        });

        scope.test('Must throw some dataBytes items have no "label" property.', (assert) => {
            // Arrange
            const data = {
                byteCode: '10000000',
                label: 'some label',
                dataBytes: [
                    { label: 'some label' },
                    {},
                ]
            };

            // Act
            const fn = () => new MidiMessageDefinition(data);

            // Assert
            assert.throws(fn, /All DataBytes items must have the property "label"/i, 'Did not throw proper error');
            assert.end();
        });

    });

    scope.test('Must have byteCode property', (assert) => {
        // Arrange
        const data = { byteCode: '10000000', label: 'some label', };

        // Act
        const definition = new MidiMessageDefinition(data);

        // Assert
        assert.equals(definition.byteCode, data.byteCode, 'Did not return correct byteCode');
        assert.end();
    });

    scope.test('Must have readonly byteCode property', (assert) => {
        // Arrange
        const data = { byteCode: '10000000', label: 'some label', };

        // Act
        const definition = new MidiMessageDefinition(data);
        const fn = () => definition.byteCode = '0';

        // Assert
        assert.throws(fn);
        assert.end();
    });

    scope.test('Must have dataBytes property', (assert) => {
        // Arrange
        const data = { byteCode: '10000000',label: 'some label', dataBytes: [] };

        // Act
        const definition = new MidiMessageDefinition(data);

        // Assert
        assert.deepEqual(definition.dataBytes, data.dataBytes, 'Did not return correct dataBytes');
        assert.end();
    });

    scope.test('Must have dataBytes property defaulting to empty array', (assert) => {
        // Arrange
        const data = { byteCode: '10000000',label: 'some label' };

        // Act
        const definition = new MidiMessageDefinition(data);

        // Assert
        assert.deepEqual(definition.dataBytes, [], 'Did not default to empty array');
        assert.end();
    });

    scope.test('Must have readonly dataBytes property', (assert) => {
        // Arrange
        const data = { byteCode: '10000000',label: 'some label' };

        // Act
        const definition = new MidiMessageDefinition(data);
        const fn = () => definition.dataBytes = '0';

        // Assert
        assert.throws(fn);
        assert.end();
    });

    scope.test('Must have dataBytes property', (assert) => {
        // Arrange
        const data = { byteCode: '10000000', label: 'some label' };

        // Act
        const definition = new MidiMessageDefinition(data);

        // Assert
        assert.deepEqual(definition.numberCode, 128, 'Did not convert to corresponding decimal.');
        assert.end();
    });

    scope.test('Must have dataBytesLength property', (assert) => {
        // Arrange
        const data = {
            byteCode: '10000000',
            label: 'some label',
            dataBytes: [
                { label: 'one' },
                { label: 'two' },
            ]
        };

        // Act
        const definition = new MidiMessageDefinition(data);

        // Assert
        assert.deepEqual(definition.dataBytesLength, 2, 'Did not return correct dataBytes length.');
        assert.end();
    });

    scope.test('Must have label property', (assert) => {
        // Arrange
        const data = {
            byteCode: '10000000',
            label: 'some label',
            dataBytes: [
                { label: 'one' },
                { label: 'two' },
            ]
        };

        // Act
        const definition = new MidiMessageDefinition(data);

        // Assert
        assert.deepEqual(definition.label, data.label, 'Did not return correct label.');
        assert.end();
    });


});
