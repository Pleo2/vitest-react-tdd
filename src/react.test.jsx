import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { beforeEach, expect } from 'vitest'
import { afterEach } from 'vitest'
import { describe, it } from 'vitest'

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const rows = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]
const operations = ['+', '*', '/']

const Calculator = () => {
    const [value, setValue] = useState('')
    const createHandlerClick = el => () => setValue(value.concat(el))
    return (
        <>
            <section>
                <h1>Calculator</h1>
                <input
                    type="text"
                    value={value}
                    readOnly
                />
                <div role="grid">
                    {rows.map((row, idx) => (
                        <div
                            key={idx}
                            role="row"
                        >
                            {row.map(number => (
                                <button
                                    onClick={createHandlerClick(number)}
                                    key={number}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    ))}
                    {operations.map(operation => (
                        <div onClick={createHandlerClick(operation)} key={operation}>{operation}</div>
                    ))}
                </div>
                <div>=</div>
            </section>
        </>
    )
}

describe('calculator', () => {
    beforeEach(() => {
        render(<Calculator />)
    })
    afterEach(cleanup)

    it('should render title correctly', () => {
        screen.getByText('Calculator')
    })

    it('should render numbers', () => {
        numbers.forEach(number => {
            screen.getByText(number)
        })
    })

    it('should render 4 rows', () => {
        const rows = screen.getAllByRole('row')
        expect(rows.length).toBe(4)
    })

    it('should render operations', () => {
        operations.forEach(operation => {
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

    it('should show user input arfetr clicking numbers and operations', () => {
        const one = screen.getByText('1')
        fireEvent.click(one)

        const sum = screen.getByText('+')
        fireEvent.click(sum)

        fireEvent.click(one)

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('1+1')
    })

    it('should calculate based on user input')
})
