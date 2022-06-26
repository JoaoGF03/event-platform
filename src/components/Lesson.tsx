import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

function FormatDate(availableAt: Date) {
  const availableDayMonth = format(availableAt, "d MMM ' / '", {
    locale: ptBR,
  });

  const availableWeekDay = format(availableAt, 'EEE', {
    locale: ptBR,
  });

  const availableDate = availableDayMonth + availableWeekDay.charAt(0).toUpperCase() + availableWeekDay.slice(1)

  const availableTime = format(availableAt, "k':'mm'h - ");

  return { availableDate, availableTime }
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const { slug: activeSlug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);

  const isActiveLesson = activeSlug === slug;

  const { availableDate, availableTime } = FormatDate(availableAt)

  return (
    <Link to={`/event/lesson/${slug}`} className='group'>
      <span className='text-gray-300'>
        {availableDate}
      </span>

      {/* `rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''}` */}
      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500': isActiveLesson,
        })}
      >
        <header className='flex items-center justify-between'>
          {isLessonAvailable ? (
            <span
              className={classNames('flex items-center gap-2 text-sm font-medium', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson,
              })}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className='flex items-center gap-2 text-sm text-orange-500 font-medium'>
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border font-bold', {
              'border-white': isActiveLesson,
              'border-green-300': !isActiveLesson,
            })}
          >
            {type === 'live' ? 'A0 VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={classNames(' mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson,
          })}
        >
          {`${availableTime} ${title}`}
        </strong>
      </div>
    </Link>
  )
}
