'use client';

import { format, isValid, parse } from 'date-fns';
import * as React from 'react';
import { cn } from '../utils/cn';
import { CalendarIcon } from 'lucide-react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const DISPLAY_FORMAT = 'dd/MM/yyyy';
const ISO_FORMAT = 'yyyy-MM-dd';
const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear();

function toDisplayString(value: string | Date | undefined): string | undefined {
    if (value == null) return undefined;
    if (value instanceof Date) return format(value, DISPLAY_FORMAT);
    const iso = parse(value, ISO_FORMAT, new Date());
    if (isValid(iso)) return format(iso, DISPLAY_FORMAT);
    const display = parse(value, DISPLAY_FORMAT, new Date());
    return isValid(display) ? value : undefined;
}

function displayToParts(displayStr: string | undefined): { day: string; month: string; year: string } {
    if (!displayStr) return { day: '', month: '', year: '' };
    const [d, m, y] = displayStr.split('/');
    const p = (s: string) => {
        if (!s) return '';
        const n = parseInt(s, 10);
        return isNaN(n) || n === 0 ? '' : s;
    };
    return { day: p(d), month: p(m), year: y && y !== '0' ? y : '' };
}

function partsToDate(day: string, month: string, year: string): Date | undefined {
    if (!day || !month || !year) return undefined;
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return undefined;
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < MIN_YEAR || y > MAX_YEAR) return undefined;
    const str = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year.padStart(4, '0')}`;
    const date = parse(str, DISPLAY_FORMAT, new Date());
    return isValid(date) ? date : undefined;
}

function clampValue(value: string, min: number, max: number): string {
    const n = parseInt(value, 10);
    if (isNaN(n)) return value;
    return Math.min(max, Math.max(min, n)).toString();
}

interface Calendar28Props {
    value: string | Date | undefined;
    onChange: (date: Date | undefined) => void;
    disabled?: boolean;
}

export function Calendar28({ value: formValue, onChange, disabled }: Calendar28Props) {
    const [open, setOpen] = React.useState(false);
    const displayStr = React.useMemo(() => toDisplayString(formValue), [formValue]);
    const {
        day: initDay,
        month: initMonth,
        year: initYear,
    } = React.useMemo(() => displayToParts(displayStr), [displayStr]);
    const initialDate = React.useMemo(() => {
        if (!displayStr) return undefined;
        const d = parse(displayStr, DISPLAY_FORMAT, new Date());
        return isValid(d) ? d : undefined;
    }, [displayStr]);

    const [day, setDay] = React.useState(initDay);
    const [month, setMonth] = React.useState(initMonth);
    const [year, setYear] = React.useState(initYear);
    const [monthState, setMonthState] = React.useState<Date>(initialDate ?? new Date());
    const editingRef = React.useRef(false);
    const lastDisplayRef = React.useRef(displayStr);
    const blurTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const dayRef = React.useRef<HTMLInputElement>(null);
    const monthRef = React.useRef<HTMLInputElement>(null);
    const yearRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (displayStr === lastDisplayRef.current) return;
        lastDisplayRef.current = displayStr;
        if (!editingRef.current) {
            const { day: d, month: m, year: y } = displayToParts(displayStr);
            setDay(d);
            setMonth(m);
            setYear(y);
            const date = displayStr ? parse(displayStr, DISPLAY_FORMAT, new Date()) : undefined;
            if (date && isValid(date)) setMonthState(date);
        }
    }, [displayStr]);

    React.useEffect(
        () => () => {
            blurTimerRef.current && clearTimeout(blurTimerRef.current);
        },
        [],
    );

    const applyDate = React.useCallback(
        (newDay: string, newMonth: string, newYear: string) => {
            editingRef.current = true;
            const date = partsToDate(newDay, newMonth, newYear);
            onChange(date ?? undefined);
            if (date) setMonthState(date);
        },
        [onChange],
    );

    const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        let v = e.target.value.replace(/\D/g, '').slice(0, 2);
        if (v.length === 2) {
            const n = parseInt(v, 10);
            if (n > 31) v = '31';
            else if (n >= 1) {
                setDay(v);
                applyDate(v, month, year);
                setTimeout(() => monthRef.current?.focus(), 0);
                return;
            }
        }
        setDay(v);
        applyDate(v, month, year);
    };

    const handleMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        let v = e.target.value.replace(/\D/g, '').slice(0, 2);
        if (v.length === 2) {
            const n = parseInt(v, 10);
            if (n > 12) v = '12';
            else if (n >= 1) {
                setMonth(v);
                applyDate(day, v, year);
                setTimeout(() => yearRef.current?.focus(), 0);
                return;
            }
        }
        setMonth(v);
        applyDate(day, v, year);
    };

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (v === '0') v = '';
        if (v.length === 4) v = clampValue(v, MIN_YEAR, MAX_YEAR);
        setYear(v);
        applyDate(day, month, v);
    };

    const blurPad = React.useCallback(
        (type: 'day' | 'month', val: string, set: React.Dispatch<React.SetStateAction<string>>) => {
            blurTimerRef.current && clearTimeout(blurTimerRef.current);
            blurTimerRef.current = setTimeout(() => {
                const max = type === 'day' ? 31 : 12;
                const n = parseInt(val, 10);
                let next = val;
                if (val.length === 1 && !isNaN(n) && n >= 1 && n <= 9) next = val.padStart(2, '0');
                else if (val === '0' || val === '00' || (val.length === 2 && (isNaN(n) || n > max || n < 1))) next = '';
                if (next !== val) {
                    set(next);
                    applyDate(type === 'day' ? next : day, type === 'month' ? next : month, year);
                }
            }, 150);
        },
        [day, month, year, applyDate],
    );

    const handleSelect = (date: Date | undefined) => {
        if (disabled) return;
        editingRef.current = true;
        onChange(date);
        if (date) {
            const str = format(date, DISPLAY_FORMAT);
            const { day: d, month: m, year: y } = displayToParts(str);
            setDay(d);
            setMonth(m);
            setYear(y);
            setMonthState(date);
        } else {
            setDay('');
            setMonth('');
            setYear('');
        }
        setOpen(false);
    };

    const keyNav = (e: React.KeyboardEvent<HTMLInputElement>, type: 'day' | 'month' | 'year') => {
        const refs = [dayRef, monthRef, yearRef];
        const i = ['day', 'month', 'year'].indexOf(type);
        const atStart = e.currentTarget.selectionStart === 0;
        const atEnd = e.currentTarget.selectionStart === e.currentTarget.value.length;
        if ((e.key === 'ArrowLeft' && atStart) || (e.key === 'Backspace' && atStart && !e.currentTarget.value)) {
            if (i > 0) {
                e.preventDefault();
                refs[i - 1].current?.focus();
            }
        } else if (e.key === 'ArrowRight' && atEnd && i < 2) {
            e.preventDefault();
            refs[i + 1].current?.focus();
        }
    };

    React.useEffect(() => {
        if (disabled && open) setOpen(false);
    }, [disabled, open]);

    const inputClass = cn(
        'border-0 h-auto focus-visible:border-0 w-8 p-0 text-center text-sm sm:text-base font-poppins-300 text-neutral-black-300',
        disabled && 'pointer-events-none select-none',
    );
    const yearClass = cn(
        'border-0 h-auto focus-visible:border-0 w-12 p-0 text-start pl-[6px] flex-1 text-sm sm:text-base font-poppins-300 text-neutral-black-300',
        disabled && 'pointer-events-none select-none',
    );

    return (
        <div className={cn('relative', disabled ? 'cursor-default opacity-40' : 'cursor-pointer')}>
            <div className="pr-10 flex rounded-md border border-input bg-neutral-white px-3 py-2 focus-within:outline-none focus-within:border focus-within:border-secondary-300 items-center gap-1">
                <Input
                    ref={dayRef}
                    type="text"
                    inputMode="numeric"
                    value={day}
                    onChange={handleDay}
                    onBlur={() => blurPad('day', day, setDay)}
                    onKeyDown={(e) => keyNav(e, 'day')}
                    placeholder="DD"
                    maxLength={2}
                    className={inputClass}
                />
                <span className="text-sm sm:text-base font-poppins-300 text-neutral-black-300 shrink-0">/</span>
                <Input
                    ref={monthRef}
                    type="text"
                    inputMode="numeric"
                    value={month}
                    onChange={handleMonth}
                    onBlur={() => blurPad('month', month, setMonth)}
                    onKeyDown={(e) => keyNav(e, 'month')}
                    placeholder="MM"
                    maxLength={2}
                    className={inputClass}
                />
                <span className="text-sm sm:text-base font-poppins-300 text-neutral-black-300 shrink-0">/</span>
                <Input
                    ref={yearRef}
                    type="text"
                    inputMode="numeric"
                    value={year}
                    onChange={handleYear}
                    onKeyDown={(e) => keyNav(e, 'year')}
                    placeholder="YYYY"
                    maxLength={4}
                    className={yearClass}
                />
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                            'absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent',
                            disabled && 'pointer-events-none select-none',
                        )}
                    >
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        mode="single"
                        selected={initialDate}
                        month={monthState}
                        onMonthChange={setMonthState}
                        onSelect={handleSelect}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
