import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import { afterEach } from 'vitest'
import { describe, it } from 'vitest'
import { OPERATIONS, EQUALSIGN, NUMBERS } from './rows'
import  Calculator from './Calculator'

describe('calculator', () => {
    beforeEach(() => {
        render(<Calculator />)
    })
    afterEach(cleanup)

    it('should render title correctly', () => {
        screen.getByText('Calculator')
    })

    it('should render numbers', () => {
        NUMBERS.forEach(number => {
            screen.getByText(number)
        })
    })

    it('should render 4 rows', () => {
        const rows = screen.getAllByRole('row')
        expect(rows.length).toBe(4)
    })

    it('should render operations', () => {
        OPERATIONS.forEach(operation => {
            screen.getByText(operation)
        })
    })

    it('should render equal sign', () => {
        screen.getByText('=')
    })

    it('should render input', () => {
        screen.getByRole('textbox') // for default input have textbox role
    })

    it('should user input after clicking a number', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('1')
    })

    it('should user input after clicking several numbers', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        const two = screen.getByText('2')
        fireEvent.click(two)
        const three = screen.getByText('3')
        fireEvent.click(three)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('123')
    })

    it('should calculate based on user input without operation', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)

        const equal = screen.getByText(EQUALSIGN)
        fireEvent.click(equal)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('11')
    })

    it('should user input clean after clicking operations', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)

        const plus = screen.getByText('+')
        fireEvent.click(plus)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('')
    })

    in('should show the input clear after clicking clear', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)
        fireEvent.click(one)

        const clearButton = screen.getByText('clear')
        fireEvent.click(clearButton)
        
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('')
    })

    it('should show result of the calculate + operation in the user input', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)

        const plus = screen.getByText('+')
        fireEvent.click(plus)

        fireEvent.click(one)
        fireEvent.click(one)

        const equal = screen.getByText(EQUALSIGN)
        fireEvent.click(equal)
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('22')
    })

    it('should show result of the calculate - operation in the user input', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)

        const minus = screen.getByText('-')
        fireEvent.click(minus)

        fireEvent.click(one)
        fireEvent.click(one)

        const equal = screen.getByText(EQUALSIGN)
        fireEvent.click(equal)
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('0')
    })

    it('should show result of the calculate / operation in the user input', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)

        const divideSlash = screen.getByText('/')
        fireEvent.click(divideSlash)

        fireEvent.click(one)
        fireEvent.click(one)

        const equal = screen.getByText(EQUALSIGN)
        fireEvent.click(equal)
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('1')
    })

    it('should show result of the calculate * operation in the user input', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)
        fireEvent.click(one)

        const times = screen.getByText('*')
        fireEvent.click(times)

        fireEvent.click(one)
        fireEvent.click(one)

        const equal = screen.getByText(EQUALSIGN)
        fireEvent.click(equal)
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('121')
    })

})
